import React from 'react';
import { Image, View, Text } from 'react-native';

export default function LoadingScreen({image, rad}) {

  const renderImage = () => {
    if (typeof image === 'string' && (image.startsWith('http') || image.startsWith('https') || image.startsWith('file://'))) {
      return { uri: image };
    }
    return image;
  };

  return (
    <View style={styles.container}>
      <Image blurRadius={rad} source={renderImage()} style={styles.image} />
      {/* <Text style={styles.header}>Loading...</Text> */}
    </View>
  );
}

const styles = {
  container: {
    alignSelf: 'center',
    position: 'absolute',
  },
  image: {
    width: 400,
    height: 750,
    position: 'absolute',
    alignSelf: 'center',
  },
  header: {
    fontSize: 24,
    color: 'white',
  },
};
