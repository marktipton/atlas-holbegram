import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, StyleSheet } from "react-native";
import firestore from "@/lib/firestore";

type Post = {
  id: string;
  caption: string;
  image: string;
  createdAt: Date;
  createdBy: string;
};

export default function HomePage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Declare the async function inside useEffect
    const fetchPosts = async () => {
      // Await the promise returned by getAllPosts
      const unsubscribe = await firestore.getAllPosts((posts: Post[]) => {
        setAllPosts(posts);
      });

      // Return unsubscribe function for cleanup
      return unsubscribe;
    };

    // Call the async function and handle cleanup
    fetchPosts().then((unsubscribe) => {
      // Cleanup listener on unmount
      return () => unsubscribe();
    });
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Feed</Text>
      <FlatList
        data={allPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.caption}>{item.caption}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  postContainer: {
    width: "100%",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  caption: {
    fontSize: 16,
    marginTop: 10,
  },
});