import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import firestore from "@/lib/firestore";
import { useAuth } from "@/components/AuthProvider";

export default function ProfilePage() {
  const auth = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfileImage() {
      const posts = await firestore.getUserPosts(auth.user?.uid!);
      if (posts.length > 0) {
        setProfileImage(posts[0].image);
      }
    }

    fetchProfileImage();
  }, [auth.user]);

  return (
    <View style={styles.container}>
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <Text>No profile image available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});