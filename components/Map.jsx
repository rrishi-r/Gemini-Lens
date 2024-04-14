import MapView from 'react-native-maps';
import { View, StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function Map() {

  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need location permissions to make this work!');
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });

  return (
    <View>
      {location ? <MapView style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.01,
        }}
      /> : <View style={styles.map}><Text>Loading...</Text></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: 380,
    height: 1000,
    position: 'absolute',
    alignSelf: 'center',
  }
});
