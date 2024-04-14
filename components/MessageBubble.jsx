import React, { useEffect } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MessageBubble({description}) {


  return (
    <View style={styles.container}>
      <Image source={require('../assets/gemini.png')} style={styles.image} />
      <LinearGradient style={styles.bubble} colors={['#2B70DE', '#9168C0']}>
          <View style={styles.inner}>
            <Text style={styles.response}>{description}</Text>
          </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  bubble: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderTopLeftRadius: 2,
    width: 256,
    justifyContent: 'center',
    // height: 'auto',
    alignSelf: 'center',
  },
  response: {
    color: '#FFF',
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
  },
  image: {
    marginTop: 20,
    width: 31.395,
    height: 36,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 23,
    alignItems: 'flex-start'
  },
  inner : {
    width: 216,
    alignSelf: 'center',
  }
});
