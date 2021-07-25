import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

export default function CompletionBar({ count, answerArray }) {
  // const [barStatus, setBarStatus] = useState([]);

  let keyCounter = -1;
  useEffect(() => {
    // console.log('BAA');
    // let temp = [];

    // for (let i = 0; i < count; i++) temp[i] = answerArray[i];

    // setBarStatus(temp);
    keyCounter = -1;
  }, []);

  useEffect(() => {
    // console.log('BAA2');
    // let temp = [];

    // for (let i = 0; i < count; i++) temp[i] = answerArray[i];

    // console.log('TEMP ESTE: ', temp);
    // setBarStatus(temp);
    keyCounter = -1;
  }, [answerArray]);

  return (
    <View style={styles.barContainer}>
      {answerArray.slice(0, count).map((item) => {
        keyCounter++;

        if (item == 0 && keyCounter < count)
          return (
            <View
              key={keyCounter}
              style={{
                height: 4,
                width: (Dimensions.get("window").width * 96) / count / 100 - 4,
                backgroundColor: "#32C671",
                marginLeft: 2,
                marginRight: 2,
              }}
            ></View>
          );

        if (item == 1 && keyCounter < count)
          return (
            <View
              key={keyCounter}
              style={{
                height: 4,
                width: (Dimensions.get("window").width * 96) / count / 100 - 4,
                backgroundColor: "red",
                marginLeft: 2,
                marginRight: 2,
              }}
            ></View>
          );

        if (item == 2 && keyCounter < count)
          return (
            <View
              key={keyCounter}
              style={{
                height: 4,
                width: (Dimensions.get("window").width * 96) / count / 100 - 4,
                backgroundColor: "gray",
                marginLeft: 2,
                marginRight: 2,
              }}
            ></View>
          );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
