import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";

export default function StatisticsCell({
  onPress,
  item
}) {

  const onPressTouchable = () => {
    onPress(item);
  }
  return (
    <TouchableOpacity onPress={() => onPressTouchable()}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.topTypeText}>{item.type}</Text>
          <Text style={styles.topDateText}>{item.date}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreContainerText}>{item.correctAnswers}/{item.numberQuestions}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: (Dimensions.get("window").width * 80) / 100,
    height: (Dimensions.get("window").height * 10) / 100,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#2A5C6B",
    backgroundColor: "#272B4A",
    marginTop: 10,
    alignSelf: "flex-start",
  },
  topContainer: {
    width: (Dimensions.get("window").width * 80) / 100,
    height: (Dimensions.get("window").height * 3) / 100,
    // borderColor:'red',
    // borderWidth: 2,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  topTypeText: {
    marginLeft: 15,
    color: "white",
    fontSize: 12,
    textAlign: "left",
    //fontFamily: "Mitr-Regular",
    fontFamily: "Mitr-Regular",
  },
  topDateText: {
    marginRight: 15,
    color: "white",
    fontSize: 12,
    textAlign: "left",
    //fontFamily: "Mitr-Regular",
    fontFamily: "Mitr-Regular",
  },
  scoreContainer: {
    // borderColor:'red',
    // borderWidth: 2,
    width: (Dimensions.get("window").width * 70) / 100,
    height: (Dimensions.get("window").height * 7) / 100,
    marginTop: 0,
    alignSelf: "center",
    alignItems: "center",
  },
  scoreContainerText: {
    color: "white",
    fontSize: 25,
    textAlign: "left",
    fontFamily: "Mitr-Regular",
  },
});
