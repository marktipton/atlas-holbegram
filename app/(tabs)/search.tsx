import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import LocationMarker from "@/components/LocationMarker";
import firestore from "@/lib/firestore";
import * as Location from 'expo-location';

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
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);

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

    // Get user's current location
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setUserLocation(currentLocation);
    };

    getUserLocation();
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
            image={post.image}
          />
        );
      }
      return null;
    });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
      {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title="Your Location"
            description="You are here"
            pinColor="blue"
          />
        )}
        {renderMarkers()}
      </MapView>
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