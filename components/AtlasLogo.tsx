import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

interface AtlasLogoProps {
  width?: number;
  height?: number;
}

const AtlasLogo: React.FC<AtlasLogoProps> = ({ width = 100, height = 100 }) => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('@/assets/images/atlas-logo.png')}
        style={{ width, height }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AtlasLogo;