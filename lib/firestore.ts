import { db } from "@/firebaseConfig";
import { addDoc, collection, query, where, orderBy, limit, getDoc, onSnapshot, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// Update the Post type to include an optional id field
type Post = {
  id: string;  // Optional for new posts since Firestore generates it
  caption: string;
  image: string;
  createdAt: Date;
  createdBy: string;
  address?: string;
  latitude?: Number;
  longitude?: Number;
};

const posts = collection(db, "posts");

async function addPost(post: Omit<Post, "id">) { // id is omitted when adding a new post
  const docRef = await addDoc(posts, post);
  return docRef.id;  // Return the newly created document's ID if needed
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