import { db } from "@/firebaseConfig";
import { geohashForLocation, geohashQueryBounds, distanceBetween } from "geofire-common";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAt,
  Timestamp,
  updateDoc,
  where,
  } from "firebase/firestore";

// Update the Post type to include an optional id field
type Post = {
  id: string;  // Optional for new posts since Firestore generates it
  caption: string;
  image: string;
  createdAt: Date;
  createdBy: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  geohash?: string;
};

type PostWithDistance = Post & {
  distance: number;  // Add the distance field
};

const posts = collection(db, "posts");

function generateGeohash(latitude: number, longitude: number): string {
  return geohashForLocation([latitude, longitude]);
}

/**
 * Fetch posts within a given radius from a center point.
 *
 * @param center - [latitude, longitude] of the center point.
 * @param radiusInKm - Radius in kilometers.
 * @returns Array of posts within the specified radius.
 */
async function getNearbyPosts(center: [number, number], radiusInKm: number): Promise<PostWithDistance[]> {
  const radiusInM = radiusInKm * 1000; // Convert radius to meters
  const bounds = geohashQueryBounds(center, radiusInM);
  const postsCollection = collection(db, "posts");

  // Create an array of query promises for each geohash range
  const promises = bounds.map(([start, end]) => {
    const rangeQuery = query(
      postsCollection,
      orderBy("geohash"),
      startAt(start),
      endAt(end)
    );
    return getDocs(rangeQuery);
  });

  // Resolve all queries and consolidate results
  const snapshots = await Promise.all(promises);

  const matchingPosts: PostWithDistance[] = []; // Use PostWithDistance type here
  snapshots.forEach((snapshot) => {
    snapshot.docs.forEach((doc) => {
      const postData = doc.data();
      const { latitude, longitude, caption, image, createdAt, createdBy } = postData;

      if (latitude != null && longitude != null) {
        // Calculate the actual distance to filter false positives
        const distanceInKm = distanceBetween([latitude, longitude], center);
        if (distanceInKm <= radiusInKm) {
          // Ensure all required fields are included and add the distance property
          matchingPosts.push({
            ...postData,  // Spread the existing post data (which includes id)
            id: doc.id,   // Ensure the document id is included
            distance: distanceInKm, // Add distance
            caption: caption || "",  // Default empty string if missing
            image: image || "",      // Default empty string if missing
            createdAt: createdAt || new Date(),  // Default current date if missing
            createdBy: createdBy || "",  // Default empty string if missing
          });
        }
      }
    });
  });
  return matchingPosts;
}

async function addPost(post: Omit<Post, "id">) {
  try {
    const geohash = post.latitude && post.longitude
      ? generateGeohash(post.latitude, post.longitude)
      : null;

    const docRef = await addDoc(posts, {
      ...post,
      geohash, // Add geohash field to the document
      createdAt: post.createdAt || new Date(), // Ensure createdAt is set
    });

    return docRef.id; // Return the newly created document's ID
  } catch (error) {
    console.error("Error adding post:", error);
    throw error; // Re-throw the error for proper error handling
  }
}

async function getUserPosts(userId: string, postLimit = 1, callback: (posts: Post[]) => void) {
  // Query to get posts for a specific user, ordered by creation date
  const userPostsQuery = query(
    posts,
    where("createdBy", "==", userId),
    orderBy("createdAt", "desc"),
    limit(postLimit)
  );

  return onSnapshot(userPostsQuery, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Post[];
    callback(posts);
  });}

async function getAllPosts(callback: (posts: Post[]) => void) {
  // Query to get all posts, ordered by creation date in descending order
  const allPostsQuery = query(posts, orderBy("createdAt", "desc"));
  return onSnapshot(allPostsQuery, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Post[];
    callback(posts);
  });}

// Function to add a favorite post
async function addFavorite(userId: string, postId: string) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    favorites: arrayUnion(postId) // Adds postId to the favorites array
  });
}

// Function to remove a favorite post
async function removeFavorite(userId: string, postId: string) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    favorites: arrayRemove(postId) // Removes postId from the favorites array
  });
}

async function fetchFavorites(userId: string) {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data().favorites || [];
  } else {
    return [];
  }
}

export default {
  addPost,
  getUserPosts,
  getAllPosts,
  addFavorite,
  removeFavorite,
  fetchFavorites,
  getNearbyPosts,
};