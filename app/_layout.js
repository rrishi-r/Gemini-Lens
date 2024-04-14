import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Arrow from '../assets/arrow_back.svg';
import Voice from '../assets/Voice.svg';

// SplashScreen.preventAutoHideAsync();

export default function Layout() {

  return(

    <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
     }}>

        <Stack.Screen name="index" options={{
          headerShown: false,
        }} />

        <Stack.Screen name="onboarding" options={{
          headerShown: false,
        }} />

        <Stack.Screen name="home" options={{
          headerShown: false,
        }} />
        <Stack.Screen name="guide" options={{
          header: props => <View style={styles.header}>
            <Pressable onPress={() => props.navigation.goBack()}><Arrow /></Pressable>
            <View style={styles.center}>
              <Image style={styles.icon} source={require('../assets/3d6d5480d01baa8625417cb053ab3d43.png')} />
              <Text style={styles.headerText}>Virtual Tour Guide</Text>
            </View>
            <Voice style={styles.icon} />
          </View>
        }} />
        <Stack.Screen name="record" options={{
          presentation: 'modal',
        }} />
     </Stack>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00042C',
    height: 101,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 55
  },
  icon: {
    width: 16,
    height: 16,
  },
  headerText: {
    color: '#FFF',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  }
});
