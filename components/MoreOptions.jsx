import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { useState } from 'react';

// import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

export default function MoreOptions({ addUserMessage, addBotMessage, messages, processing, setProcessing}) {


  async function handleHotelRequest() {

    if (processing) {
      return null;
    }

    setProcessing(true);

    const curr = addUserMessage(messages, "Hotel");

    console.log("handling hotel request");
    const formData = new FormData();
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const location = await Location.getCurrentPositionAsync({});
    const localTime = `${hours}:${minutes}:${seconds}`;
    console.log(formData);
    formData.append('desc', messages[0]['text'])
    formData.append('latitude', location.coords.latitude);
    formData.append('longitude', location.coords.longitude);
    formData.append('localTime', localTime);

    const result = await fetch('http://35.2.64.165:5001/hotels', {
      method: 'POST',
      body: formData,
    })

    const data = await result.text();

    setProcessing(false);
    addBotMessage(curr, data);
    console.log(data);
  }

  async function handleRecommendationsRequest() {

    if (processing) {
      return null;
    }

    setProcessing(true);

    const curr = addUserMessage(messages, "Recommendations");

    const formData = new FormData();
    console.log(formData);
    const location = await Location.getCurrentPositionAsync({});
    formData.append('desc', messages[0]['text'])
    formData.append('latitude', location.coords.latitude);
    formData.append('longitude', location.coords.longitude);

    const result = await fetch('http://35.2.64.165:5001/more-places', {
      method: 'POST',
      body: formData,
    })

    const data = await result.text();

    setProcessing(false);
    addBotMessage(curr, data);
    console.log(data);
  }


  async function handleSafety() {

    if (processing) {
      return null;
    }

    const curr = addUserMessage(messages, "Safety");

    setProcessing(true);

    console.log("handling hotel request");
    const formData = new FormData();
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const location = await Location.getCurrentPositionAsync({});
    const localTime = `${hours}:${minutes}:${seconds}`;
    console.log(formData);
    formData.append('desc', messages[0]['text'])
    formData.append('latitude', location.coords.latitude);
    formData.append('longitude', location.coords.longitude);
    formData.append('localTime', localTime);
    console.log("TIME: ", localTime);

    const result = await fetch('http://35.2.64.165:5001/safety', {
      method: 'POST',
      body: formData,
    })

    const data = await result.text();

    setProcessing(false);
    addBotMessage(curr, data);
    console.log(data);
  }

  return (
      <View style={styles.container}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={handleSafety}>
                <View style={styles.suggestionFirst}>
                  <Text style={styles.text}>🕒 Safety</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRecommendationsRequest}>
                <View style={styles.suggestion}>
                  <Text style={styles.text}>📚 Other Places to See</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleHotelRequest}>
              <View style={styles.suggestion}>
                <Text style={styles.text}>🏠 Nearby Hotels</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={handleHotelRequest}>
              <View style={styles.suggestion}>
                <Text style={styles.text}>More...</Text>
              </View>
            </TouchableOpacity> */}
          </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // bottom: 30,
    // width: '100%',
    // height: 100,
    height: 38,
    // backgroundColor: 'black',
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    display: 'inline-flex',
    flexDirection: 'row',
    // paddingVertical: 0,
    // paddingHorizontal: 18,
    marginBottom: 0,
    // marginHorizontal: 10,
    alignSelf: 'flex-end'
  },
  text: {
    color: '#FFF',
    fontSize: 13,
    fontFamily: 'Roboto_400Regular',
    fontStyle: 'normal',
    fontWeight: 400,
    marginVertical: -4,
  },
  suggestion: {
    borderRadius: 32,
    backgroundColor: '#214485',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    alignItems: 'center',
    display: 'flex',
    gap: 10,
  },
  suggestionFirst: {
    borderRadius: 32,
    backgroundColor: '#214485',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    alignItems: 'center',
    display: 'flex',
    gap: 10,
    marginLeft: 20,
  },
});
