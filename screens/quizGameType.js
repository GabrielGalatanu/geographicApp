import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";

import FlatButton from "../shared/button";

export default function QuizGameType(props) {
  const navigateToScreen = (data) => {
    props.navigation.navigate("QuizGameRegion", { type: data });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        opacity={0.2}
        source={require("../assets/SAmerica2.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <FlatButton
          text="Guess the capital"
          onPress={() => navigateToScreen("Capital")}
        />

        <FlatButton
          text="Guess the neighbor"
          onPress={() => navigateToScreen("Neighbours")}
        />

        <FlatButton
          text="Guess the flag"
          onPress={() => navigateToScreen("Flag")}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#354272",
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
