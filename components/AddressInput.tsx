import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

interface AddressInputProps {
  onAddressChange: (address: string) => void;
}

export default function AddressInput({ onAddressChange }: AddressInputProps) {
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleGeocode = async () => {
    if (!address) {
      Alert.alert('Error', 'Please enter an address.');
      return;
    }
    try {
      setLoading(true);
      // Convert address to latitude and longitude
      const geocode = await Location.geocodeAsync(address);

      if (geocode.length === 0) {
        Alert.alert('Error', 'Unable to find location for the given address.');
        return;
      }

      const { latitude, longitude } = geocode[0];
      console.log('Coordinates:', { latitude, longitude });

      // Get reverse geocoded data
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocode.length > 0) {
        const location = reverseGeocode[0];
        const formattedAddress = `${location.name || ''} ${location.street || ''}, ${location.city || ''}, ${location.region || ''}, ${location.country || ''}`.trim();
        setAddress(formattedAddress);
        onAddressChange(formattedAddress);
        Alert.alert('Success', `Geocoded address: ${formattedAddress}`);
      } else {
        Alert.alert('Error', 'Unable to geocode coordinates.');
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      Alert.alert('Error', 'Something went wrong while geocoding.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={address}
        onChangeText={setAddress}
      />
      <Button
        title={loading ? 'Processing...' : 'Geocode Address'}
        onPress={handleGeocode}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 50,
    borderRadius: 5,
    width: '100%',
  },
});