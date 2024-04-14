
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserBubble({description}) {

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <View style={styles.inner}>
          <Text style={styles.response}>{description}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderTopRightRadius: 2,
    width: 256,
    marginRight: 20,
    marginTop: 20,
  },
  response: {
    color: 'black',
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
  },
  image: {
    width: 31.395,
    height: 36,
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  inner : {
    width: 216,
    alignSelf: 'center',
  }
});
