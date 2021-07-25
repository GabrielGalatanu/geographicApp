import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./routes/homeStack";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
export default function App() {
  let [fontsLoaded] = useFonts({
    "Mitr-Regular": require('./assets/fonts/Mitr-Regular.ttf'),
    "Mitr-SemiBold": require('./assets/fonts/Mitr-SemiBold.ttf'),
    "OtomanopeeOne-Regular" : require('./assets/fonts/OtomanopeeOne-Regular.ttf')
  });

  if (!fontsLoaded) {
    return <Text></Text>;
  } else {
    return <Navigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
