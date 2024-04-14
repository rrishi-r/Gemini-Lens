import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import GuideScreen from './GuideScreen';
import { router } from 'expo-router';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';
import * as Location from 'expo-location';
import Camera from '../assets/camera.svg';


export default function CameraButton() {

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    })();
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need location permissions to make this work!');
      }

    })();
  }, []);

    async function takePicture() {


      const photo = await ImagePicker.launchCameraAsync();
      if (photo.canceled === true) {
        return null;
      }

      router.push({
        pathname: 'guide',
        params: {
          image: photo["assets"][0]["uri"],
        }
      })
    }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
        <Camera style={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  cameraButton: {
    display: 'flex',
    // justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
    // alignSelf: 'flex-start',
    bottom: 40
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
