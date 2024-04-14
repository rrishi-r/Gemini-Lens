import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import BottomSheet from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useMemo } from 'react';


export default function Onboarding() {
  const [page, setPage] = useState(0)

  const pages = [
    {
      title: "Snap a photo",
      details: "Turn your camera into a virtual tour guide with Google Maps.",
      img: require('../assets/fig1.png')
    },
    {
      title: "Identify the Location",
      details: "Gemini uses image recognition to unlock virtual tours right within Google Maps.",
      img: require('../assets/fig2.png')
    },
    {
      title: "Virtual Tour Guide",
      details: "Get rid of traditional tour guide and save you a bunch of money!",
      img: require('../assets/fig3.png')
    },
  ]

  function nextPage() {
    if (page == 2) {
      router.push({
        pathname: "home"
      });
    } else {
      setPage(page + 1);
    }

  }

  function backPage() {
    if (page == 0) {
      router.back();
    }
    else {
      setPage(page - 1);
    }
  }

  function skipPages() {
    router.push({
      pathname: "home"
    });
  }

  const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

  return (
    <LinearGradient
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      colors={['#2B70DE', '#9168C0', '#737373']}
      locations={[0.13, .96, 1]}
      style={styles.gradient}
    >
      <Image source={pages[page].img} style={styles.image} />
      <View style={styles.sheet}>
        <Text style={styles.title}>{pages[page].title}</Text>
        <Text style={styles.desc}>{pages[page].details}</Text>
        <View style={styles.indicatorContainer}>
          {[...Array(3).keys()].map((index) => (
            <View
              key={index}
              style={[
                styles.circle,
                page === index && styles.activeCircle
              ]}
            />
          ))}
        </View>
        <View style={styles.buttons}>
          {/* <Pressable onPress={backPage}><Text style={styles.buttonText} >Back</Text></Pressable> */}
          <Pressable style={styles.nextButton} onPress={nextPage}><Text style={styles.buttonText} >{page == 2 ? "Begin" : "Next"}</Text></Pressable>
          <Pressable style={styles.skipButton} onPress={skipPages}><Text style={styles.skipText} >Skip</Text></Pressable>
        </View>
      </View>
    </LinearGradient>
    // </>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'absolute',
  },
  circle: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#2B70DE',
    margin: 5,
    opacity: 1,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 300
  },
  activeCircle: {
    backgroundColor: '#FFF'
  },
  sheet: {
    width: '100%',
    height: '45%',
    backgroundColor: '#00042C',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  title: {
    fontSize: 30,
    position: 'absolute',
    bottom: 300,
    color: 'white',
    fontFamily: 'Roboto_700Bold',
    // padding: 20
    marginTop: 20
  },
  desc: {
    color: "#808080",
    fontFamily: 'Roboto_400Regular',
    margin: 20,
    marginHorizontal: 60,
    top: 80,
    position: 'absolute',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    gap: 12,
    position: 'absolute',
    bottom: 30
  },
  nextButton: {
    paddingHorizontal: 128,
    paddingVertical: 18,
    borderRadius: 18,
    backgroundColor: '#3F6FD9',
    position: 'absolute',
    bottom: 50,
  },
  skipButton: {
    // paddingHorizontal: 128,
    // paddingVertical: 18,
    // borderRadius: 18,
    // backgroundColor: '#214485',
  },
  skipText: {
    color: '#808080',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
    marginBottom: 0,
  }
});
