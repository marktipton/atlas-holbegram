import { db } from "@/firebaseConfig";
import { addDoc, collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";

// Update the Post type to include an optional id field
type Post = {
  id: string;  // Optional for new posts since Firestore generates it
  caption: string;
  image: string;
  createdAt: Date;
  createdBy: string;
};

const posts = collection(db, "posts");

async function addPost(post: Omit<Post, "id">) { // id is omitted when adding a new post
  const docRef = await addDoc(posts, post);
  return docRef.id;  // Return the newly created document's ID if needed
}

async function getUserPosts(userId: string, postLimit = 1) {
  // Query to get posts for a specific user, ordered by creation date
  const userPostsQuery = query(
    posts,
    where("createdBy", "==", userId),
    orderBy("createdAt", "desc"),
    limit(postLimit)
  );

  const snapshot = await getDocs(userPostsQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Post));
}

export default {
  addPost,
  getUserPosts,
};