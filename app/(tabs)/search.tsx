import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import LocationMarker from "@/components/LocationMarker";
import firestore from "@/lib/firestore"; // Adjust the import path as needed

type Post = {
  id: string;
  caption: string;
  image: string;
  createdAt: Date;
  createdBy: string;
  address?: string;
  latitude?: Number;
  longitude?: Number;
};

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]); // Post type should be imported or defined

  useEffect(() => {
    // Fetch all posts from the firestore
    const fetchPosts = async () => {
      const unsubscribe = await firestore.getAllPosts((posts: Post[]) => {
        setPosts(posts);
      });

      // Return unsubscribe function for cleanup
      return unsubscribe;
    };

    // Call the async function and handle cleanup
    fetchPosts().then((unsubscribe) => {
      // Cleanup listener on unmount
      return () => unsubscribe();
    });
  }, [])

  const renderMarkers = () => {
    return posts.map((post) => {
      if (post.latitude && post.longitude) {
        return (
          <LocationMarker
            key={post.id}
            location={{
              latitude: post.latitude as number,
              longitude: post.longitude as number,
            }}
            title={post.caption || "Untitled Post"}
            description={post.address || "No address provided"}
          />
        );
      }
      return null;
    });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>{renderMarkers()}</MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});