import React from "react";
import { Marker } from "react-native-maps";

interface LocationMarkerProps {
  location: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
}

export default function LocationMarker({ location, title, description }: LocationMarkerProps) {
  return (
    <Marker
      coordinate={location}
      title={title}
      description={description}
    />
  );
}