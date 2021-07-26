import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";

import FlatButton from "../shared/button";

export default function Home(props) {
  const navigateToScreen = (screen) => {
    props.navigation.navigate(screen);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        opacity={0.2}
        source={require("../assets/Europe2.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <FlatButton
          text="Study"
          onPress={() => navigateToScreen("Continents")}
        />

        <FlatButton
          text="Game"
          onPress={() => navigateToScreen("QuizGameType")}
        />

        <FlatButton
          text="Statistics"
          onPress={() => navigateToScreen("StatisticsList")}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(53, 66, 114, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
