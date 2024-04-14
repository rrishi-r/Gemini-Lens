import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';

import { record } from '../app/record'

export default function RecordButton() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cameraButton} onPress={() => router.push({
        pathname: 'record',
      })}>
        <FontAwesome style={styles.icon} name="camera" size={24} color="red" />
      </TouchableOpacity>
    </View>
  )
}
