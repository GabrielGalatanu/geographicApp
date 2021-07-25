import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";

import { createStackNavigator } from "react-navigation";

import FlatButton from "../shared/button";

export default function Continents(props) {
  const navigateToScreen = (continent) => {
    props.navigation.navigate("Countries", { continent: continent });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        opacity={0.2}
        source={require("../assets/Oceania2.png")}
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
