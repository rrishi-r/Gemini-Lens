import { StatusBar } from 'expo-status-bar';
import LandingPage from '../components/LandingPage';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_900Black } from "@expo-google-fonts/roboto";

export default function Landing() {

  const [fontsLoaded, fontsError] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_900Black,
  });

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <LandingPage />
    </>
  );
}
