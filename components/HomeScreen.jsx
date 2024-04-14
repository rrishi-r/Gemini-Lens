import { View, StyleSheet, Text } from 'react-native';
import Map from './Map';
import CameraButton from './CameraButton';
import RecordButton from './RecordButton';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.loading}>Loading...</Text>
      <Map />
      <CameraButton />
      {/* <RecordButton /> */}
      {/* <RecordButton /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#00042C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 500,
    color: 'white',
    fontSize: 24,
    fontFamily: 'Roboto_900Black'
  }
});
