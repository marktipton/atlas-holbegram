import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import MapView, {Marker} from 'react-native-maps';

let locationOfInterest = [
  {
    title: "First",
    location: {
      latitude: 36.12,
      longitude: -95.94,
    },
    description: "My First Marker"
  },
  {
    title: "Second",
    location: {
      latitude: 36.11,
      longitude: -95.93,
    },
    description: "My Second Marker"
  },

]


export default function Page() {
  const showLocationsOfInterest = () => {
    return locationOfInterest.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        />
      )
    });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {showLocationsOfInterest()}
      </MapView>
      {/* <Text>Search</Text>
      <Link href='/profile/1'>
        <Text>Profile 1</Text>
      </Link>
      <Link href='/profile/2'>
        <Text>Profile 2</Text>
      </Link> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  }

});