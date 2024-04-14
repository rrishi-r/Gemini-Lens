import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GuideScreen from '../components/GuideScreen';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Guide() {

  const { image } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <GuideScreen image={image}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: 'white',
  },
  description: {
    fontSize: 18,
    color: 'white',
  },
});
