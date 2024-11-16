import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import firestore from "@/lib/firestore";

export default function FavoritesPage({ userId }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch favorites when the component mounts
    const fetchUserFavorites = async () => {
      try {
        const userFavorites = await firestore.fetchFavorites(userId);
        setFavorites(userFavorites);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchUserFavorites();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
              <Text>{item}</Text>
              {/* Placeholder - customize this to show the actual post data */}
            </View>
          )}
        />
      ) : (
        <Text>No favorites yet.</Text>
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
  favoriteItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3, // Use elevation for shadow in React Native
  },
});