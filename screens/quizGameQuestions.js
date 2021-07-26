import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";

import FlatButton from "../shared/button";

export default function QuizGameQuestions(props) {
  const navigateToScreen = (data) => {
    if (props.navigation.getParam("type") == "Capital") {
      props.navigation.navigate("QuizGame", {
        type: props.navigation.getParam("type"),
        region: props.navigation.getParam("region"),
        questionsCount: data,
      });
    } else if (props.navigation.getParam("type") == "Neighbours") {
      props.navigation.navigate("QuizGameNeighbours", {
        type: props.navigation.getParam("type"),
        region: props.navigation.getParam("region"),
        questionsCount: data,
      });
    } else if (props.navigation.getParam("type") == "Flag") {
      props.navigation.navigate("QuizGameFlags", {
        type: props.navigation.getParam("type"),
        region: props.navigation.getParam("region"),
        questionsCount: data,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        opacity={0.2}
        source={require("../assets/Africa2.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <FlatButton text="5 questions" onPress={() => navigateToScreen(5)} />

        <FlatButton text="10 questions" onPress={() => navigateToScreen(10)} />

        <FlatButton text="15 questions" onPress={() => navigateToScreen(15)} />
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
