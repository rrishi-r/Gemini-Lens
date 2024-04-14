import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  let cameraRef = useRef();
  const [CameraPermission, setCameraPermission] = useState(false);
  const [MicrophonePermission, setMicrophonePermission] = useState(false);
  const [Recording, setRecording] = useState(false);
  const [video, setVideo] = useState();

  useEffect(() => {
    (async () => {
      const CameraPermission = await Camera.requestCameraPermissionsAsync();
      const MicrophonePermission = await Camera.requestMicrophonePermissionsAsync();
      setCameraPermission(setMicrophonePermission(true));
      setMicrophonePermission(setMicrophonePermission(true));
    })();
  }, []);

  if (!CameraPermission) {
    return <Text>Camera access denied</Text>
  } else if (!MicrophonePermission) {
    return <Text>Microphone access denied.</Text>
  }

  const recordVideo = () => {
    setRecording(true);
    const videoOptions = {
      quality: "1080p",
      maxDuration: 5,
      mute: false
    };

    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setRecording(false);
    });
  };

  let stopRecording = () => {
    setRecording(false);
    cameraRef.current.stopRecording();
  };

  async function processVideo() {

      try {
        const location = await Location.getCurrentPositionAsync({});

        const formData = new FormData();

        formData.append('VideoData', {
            uri: Recording,
            type: 'video/mp4',
            name: 'video'
        });
        formData.append('latitude', location.coords.latitude);
        formData.append('longitude', location.coords.longitude);

        const result = await fetch('http://35.2.64.165:5001/analyzeVideo', {
            method: 'POST',
            body: formData,
        });

        const data = await result.text();

        setResponse(data);
        setIsLoading(false);

        router.push({
          pathname: 'guide',
          params: {
              video: record,
              response: data,
          }
        })

      } catch (e) {
        console.log("ERROR: ", e);
      }
  }


  if (video) {
    return (
      <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{uri: video.uri}}
          useNativeControls
          resizeMode='contain'
          isLooping
        />
        <Button title="Save" onPress={processVideo} />
        <Button title="Discard" onPress={() => setVideo(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Button title={Recording ? "Stop Recording" : "Record Video"} onPress={isRecording ? stopRecording : recordVideo} />
        <FontAwesomeIcon icon={isRecording ? faStop : faPlay} />
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
  }
});