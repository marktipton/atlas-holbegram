import React from "react";
import { Marker, Callout } from "react-native-maps";
import { View, Text, Image, StyleSheet } from "react-native";

interface LocationMarkerProps {
  location: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
  image?: string;
}

export default function LocationMarker({ location, title, description, image }: LocationMarkerProps) {
  return (
    <Marker coordinate={location}>
      <Callout>
        <View style={styles.calloutContainer}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </Callout>
    </Marker>
  );
}

const styles = StyleSheet.create({
  calloutContainer: {
    width: 200,
    alignItems: "center",
  },
  image: {
    width: 180,
    height: 100,
    marginBottom: 5,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
});