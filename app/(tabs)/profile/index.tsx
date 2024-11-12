import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, StyleSheet, Dimensions } from "react-native";
import firestore from "@/lib/firestore";
import { useAuth } from "@/components/AuthProvider";

// Define the Post type or import it if it’s already defined in your Firestore helper
type Post = {
  id: string;
  caption: string;
  image: string;
  createdAt: Date;
  createdBy: string;
};

export default function ProfilePage() {
  const auth = useAuth();
  const [userPosts, setUserPosts] = useState<Post[]>([]); // Add Post[] as the type

  useEffect(() => {
    async function fetchUserPosts() {
      if (auth.user) {
        const posts = await firestore.getUserPosts(auth.user.uid, 10); // Fetch the last 10 posts
        setUserPosts(posts); // This should now work without error
      }
    }

    fetchUserPosts();
  }, [auth.user]);

  const numColumns = 3;
  const imageSize = Dimensions.get("window").width / numColumns - 10; // Adjusts for spacing

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {userPosts.length > 0 ? (
        <FlatList
          data={userPosts}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.image }}
              style={[styles.image, { width: imageSize, height: imageSize }]}
            />
          )}
          columnWrapperStyle={styles.row}
        />
      ) : (
        <Text>No posts yet</Text>
      )}
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
  row: {
    justifyContent: "space-between",
  },
  image: {
    borderRadius: 8,
    margin: 5,
  },
});