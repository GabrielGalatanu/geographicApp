import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";

import FlatButton from "../shared/button";

export default function QuizGameRegion(props) {
  const navigateToScreen = (data) => {
    props.navigation.navigate("QuizGameQuestions", {
      type: props.navigation.getParam("type"),
      region: data,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        opacity={0.2}
        source={require("../assets/Asia2.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <FlatButton text="Africa" onPress={() => navigateToScreen("africa")} />

        <FlatButton
          text="Americas"
          onPress={() => navigateToScreen("americas")}
        />

        <FlatButton text="Asia" onPress={() => navigateToScreen("asia")} />

        <FlatButton text="Europe" onPress={() => navigateToScreen("europe")} />

        <FlatButton
          text="Oceania"
          onPress={() => navigateToScreen("oceania")}
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
