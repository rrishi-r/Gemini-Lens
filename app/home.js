import { Stack, router } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";
import HomeScreen from "../components/HomeScreen";
import { StatusBar } from "expo-status-bar";

export default function Home() {


  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 54,
    color: "white",
  },
  description: {
    fontSize: 18,
    color: "white",
  },
});
