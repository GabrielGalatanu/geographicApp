import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Image,
} from "react-native";

export default function QuizButton({ index, text, onPress, ok }) {
  const [borderColour, setBorderColor] = useState("#565D7A");

  const buttonPressed = () => {
    onPress(index);
  };

  useEffect(() => {
    if (ok == false) setBorderColor("#565D7A");
    else setBorderColor("#32C671");
  }, [ok]);

  return (
    <TouchableOpacity onPress={() => buttonPressed()}>
      <View style={[styles.button, { borderColor: borderColour }]}>
        <View style={styles.leftSide}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>

        <View style={styles.rightSide}>
          {ok == 0 && <View style={styles.okCircle}></View>}
          {ok == 1 && (
            <Image
              style={styles.check}
              resizeMode={"cover"}
              source={require("../assets/ok.png")}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#565D7A",
    paddingVertical: 12,
    paddingHorizontal: 6,
    width: (Dimensions.get("window").width * 90) / 100,
    backgroundColor: "#171D37",
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 20,
    color: "white",
    fontSize: 15,
    textAlign: "left",
    //fontFamily: "Mitr-Regular",
    fontFamily: "Mitr-SemiBold",
  },
  okCircle: {
    borderRadius: 200,
    borderWidth: 3,
    borderColor: "#565D7A",
    marginRight: 10,
    width: (Dimensions.get("window").width * 6) / 100,
    height: (Dimensions.get("window").width * 6) / 100,
  },
  check: {
    marginRight: 10,
    width: (Dimensions.get("window").width * 6) / 100,
    height: (Dimensions.get("window").width * 6) / 100,
  },
  leftSide: { width: (Dimensions.get("window").width * 60) / 100 },
  rightSide: {
    width: (Dimensions.get("window").width * 10) / 100,
    justifyContent: "center",
  },
});
