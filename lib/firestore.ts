import { db } from "@/firebaseConfig";
import { geohashForLocation } from "geofire-common";
import {
  addDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDoc,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp
 } from "firebase/firestore";

// Update the Post type to include an optional id field
type Post = {
  id: string;  // Optional for new posts since Firestore generates it
  caption: string;
  image: string;
  createdAt: Date | Timestamp;
  createdBy: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  geohash?: string;
};

const posts = collection(db, "posts");

function generateGeohash(latitude: number, longitude: number): string {
  return geohashForLocation([latitude, longitude]);
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
};