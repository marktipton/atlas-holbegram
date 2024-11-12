import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, StyleSheet } from "react-native";
import firestore from "@/lib/firestore";
import { TapGestureHandler, GestureHandlerRootView } from "react-native-gesture-handler";

type Post = {
  id: string;
  caption: string;
  image: string;
  createdAt: Date;
  createdBy: string;
};

export default function HomePage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [favorites, setFavorites] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch all posts from the firestore
    const fetchPosts = async () => {
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


  // Function to handle double-tap and add/remove favorites
  const handleDoubleTap = (post: Post) => {
    setFavorites((prevFavorites) => {
      // If the post is not in favorites, add it
      if (!prevFavorites.some((fav) => fav.id === post.id)) {
        alert("added to favorites");
        return [...prevFavorites, post];
      } else {
        alert("unfavorited");
        // If the post is already in favorites, remove it
        return prevFavorites.filter((fav) => fav.id !== post.id);
      }
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Home Feed</Text>
        <FlatList
          data={allPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TapGestureHandler onActivated={() => handleDoubleTap(item)} numberOfTaps={2}>
              <View style={styles.postContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.caption}>{item.caption}</Text>
              </View>
            </TapGestureHandler>
          )}
        />
        <Text style={styles.favoritesTitle}>Favorites</Text>
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.favoritePostContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.caption}>{item.caption}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noFavorites}>No favorites yet</Text>
        )}
      </View>
    </GestureHandlerRootView>
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
  favoritesTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },
  noFavorites: {
    fontSize: 18,
    color: "gray",
    marginTop: 10,
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
  favoritePostContainer: {
    width: "100%",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
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