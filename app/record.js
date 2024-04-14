import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Location from 'expo-location';

export default function record() {
  let cameraRef = useRef();
  const [CameraPermission, setCameraPermission] = useState(false);
  const [MicrophonePermission, setMicrophonePermission] = useState(false);
  const [Recording, setRecording] = useState(false);
  const [video, setVideo] = useState();
  const [response, setResponse] = useState();

  useEffect(() => {
    (async () => {
      const CameraPermission = await Camera.requestCameraPermissionsAsync();
      const MicrophonePermission = await Camera.requestMicrophonePermissionsAsync();
      const LocationPermission = await Location.requestForegroundPermissionsAsync();
      setCameraPermission(setMicrophonePermission(true));
      setMicrophonePermission(setMicrophonePermission(true));
    })();
  }, []);


  const recordVideo = () => {
    setRecording(true);
    const videoOptions = {
      quality: "1080p",
      maxDuration: 5,
      mute: false
    };

    cameraRef.current.recordAsync(videoOptions).then((recordedVideo) => {
      setVideo(recordedVideo.uri);
      setRecording(false);
    });
  };

  async function processVideo() {

    try {
      const location = await Location.getCurrentPositionAsync({});
      console.log("check 1")

      const formData = new FormData();

      console.log("check 2")

      formData.append('VideoData', {
          uri: video,
          type: 'video/mp4',
          name: 'video'
      });
      let data1 = {"key": "value"}
      formData.append('latitude', location.coords.latitude);
      formData.append('longitude', location.coords.longitude);

      console.log("check 3")
      console.log(formData);

      const result = await fetch('http://35.2.64.165:5001/analyzeVideo', {
          method: 'POST',
          body: formData,
      });

      console.log("check 4")

      const data = await result.text();

      console.log("check 5")

      setResponse(data);
      // Debugging
      console.log("Here");
      console.log(data);

    } catch (e) {
      console.log("ERROR: ", e);
    }
}

  let stopRecording = () => {
    setRecording(false);
    cameraRef.current.stopRecording();
    // <Button title="Save" onPress={processVideo} />
    // <Button title="Discard" onPress={() => setVideo(undefined)} />
  };

  if (video) {
    return (
      <SafeAreaView style={styles.container}>
        <Button title="Save" onPress={processVideo} />
        <Button title="Discard" onPress={() => setVideo(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.middleLowerContainer}>
        <TouchableOpacity onPress={Recording ? stopRecording : recordVideo}>
          <FontAwesome name={Recording ? 'stop-circle' : 'play-circle'} size={75} color="red" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end"
  },
  video: {
    flex: 1,
    alignSelf: "stretch"
  },
  middleLowerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 60,
    alignItems: "center",
  },
});
