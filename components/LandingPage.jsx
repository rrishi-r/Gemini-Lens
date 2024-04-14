import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';


export default function LandingPage() {
  return (
    <ImageBackground
      source={require('../assets/bg-gradient.png')}
      style={styles.container}
      resizeMode='cover'
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.20)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        locations={[0, 0.085]} // This corresponds to 0% and 8.5% in the CSS
        style={styles.fullSize}
      >
        <View style={styles.heading}>
          <Image source={require('../assets/gemini.png')} style={{ width: 70, height: 70, marginBottom: 0, alignSelf: 'center', bottom: -20 }} />
          <MaskedView
            style={styles.maskStyle}
            maskElement={
              <View style={styles.maskElement}>
                <Text style={styles.title}>Gemini Lens</Text>
              </View>
            }
          >
            <LinearGradient
              colors={['#FFF', '#9168C0', '#737373']}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.2, y: 0 }}
              locations={[0.154, .8, 1.0]}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <MaskedView
            style={styles.maskStyle}
            maskElement={
              <View style={styles.maskElement}>
                <View style={styles.subheading}>
                  <Text style={styles.subtitle}>Photo.</Text>
                  <Text style={styles.subtitle}>Location.</Text>
                  <Text style={styles.subtitle}>Tour Guide.</Text>
                </View>
              </View>
            }
          >
            <LinearGradient
              colors={['#FFF', '#9168C0', '#737373']}
              start={{ x: 0.8, y: 1 }}
              end={{ x: 0.05, y: 0 }}
              locations={[0.254, .92, 1.0]}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </View>

        <Pressable style={styles.started} onPress={() => router.push({
          pathname: 'onboarding',
        })}>
          <Text style={styles.text}>Get Started</Text>
        </Pressable>

      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fullSize: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    top: -30,
    color: 'white',
    fontSize: 40,
    fontFamily: 'Roboto_900Black',
    fontWeight: '900',
    textAlign: 'center',
    alignSelf: 'center',
  },
  subtitle: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 400,
    color: 'white',
  },
  heading: {
    marginBottom: 0,
    height: '50%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  subheading: {
    height: '100%',
    textAlign: 'left',
    marginLeft: -70,
    bottom: -60,
  },
  started: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderRadius: 32,
    bottom: -30,
    alignSelf: 'center',
    marginTop: 100
  },
  text: {
    color: '#9168C0',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
  },
  maskStyle: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
  },
  maskElement: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
