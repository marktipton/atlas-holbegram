import { db } from "@/firebaseConfig";
import { addDoc, collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";

type Post = {
  caption: string,
  image: string,
  createdAt: Date,
  createdBy: string,
};

const posts = collection(db, "posts");

async function addPost(post: Post) {
  await addDoc(posts, post);
}

async function getUserPosts(userId: string, postLimit = 1) {
  // Create a query to get posts for a specific user, ordered by creation date
  const userPostsQuery = query(
    posts,
    where("createdBy", "==", userId),
    orderBy("createdAt", "desc"),
    limit(postLimit) // Limit the number of posts returned
  );

  const snapshot = await getDocs(userPostsQuery);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];
}

export default {
  addPost,
  getUserPosts,
};