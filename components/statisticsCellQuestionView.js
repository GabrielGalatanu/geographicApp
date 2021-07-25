import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Image,
} from "react-native";

export default function StatisticsCellQuestionView(props) {
  const [borderColour, setBorderColor] = useState("#565D7A");
  const [ok, setOk] = useState(2);

  useEffect(() => {
    if (props.type == "Capital") {
      if (
        props.shuffle[props.questionNumber][props.index] == props.questions[0]
      ) {
        setBorderColor("#32C671");
        setOk(1);
      }

      if (props.answers[props.questionNumber][props.index] == 1) {
        if (
          props.shuffle[props.questionNumber][props.index] == props.questions[0]
        ) {
          setBorderColor("#32C671");
          setOk(1);
        } else {
          setBorderColor("#CD3030");
          setOk(0);
        }
      }
    } else if (props.type == "Neighbours") {
      if (
        props.shuffle[props.questionNumber][props.index] == props.questions[1]
      ) {
        setBorderColor("#32C671");
        setOk(1);
      }

      if (props.answers[props.questionNumber][props.index] == 1) {
        if (
          props.shuffle[props.questionNumber][props.index] == props.questions[1]
        ) {
          setBorderColor("#32C671");
          setOk(1);
        } else {
          setBorderColor("#CD3030");
          setOk(0);
        }
      }
    } else if (props.type == "Flag") {
      if (
        props.shuffle[props.questionNumber][props.index] == props.questions[0]
      ) {
        setBorderColor("#32C671");
        setOk(1);
      }

      if (props.answers[props.questionNumber][props.index] == 1) {
        if (
          props.shuffle[props.questionNumber][props.index] == props.questions[0]
        ) {
          setBorderColor("#32C671");
          setOk(1);
        } else {
          setBorderColor("#CD3030");
          setOk(0);
        }
      }
    }
  }, []);

  if (props.type == "Capital" || props.type == "Neighbours") {
    return (
      <TouchableOpacity>
        <View style={[styles.button, { borderColor: borderColour }]}>
          <View style={styles.leftSide}>
            <Text style={styles.buttonText}>{props.text}</Text>
          </View>

          <View style={styles.rightSide}>
            {ok == 2 && <View style={styles.okCircle}></View>}
            {ok == 1 && (
              <Image
                style={styles.check}
                resizeMode={"cover"}
                source={require("../assets/ok.png")}
              />
            )}
            {ok == 0 && (
              <Image
                style={styles.check}
                resizeMode={"cover"}
                source={require("../assets/wrong.png")}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  } else if (props.type == "Flag") {
    return (
      <TouchableOpacity>
        <View style={[styles.buttonFlag, { borderColor: borderColour }]}>
          <Image
            style={styles.flag}
            resizeMode={"cover"}
            source={{
              uri: "https://www.countryflags.io/" + props.text + "/flat/64.png",
            }}
          />

          <View style={styles.rightSide}>
            {ok == 2 && <View style={styles.okCircle}></View>}
            {ok == 1 && (
              <Image
                style={styles.check}
                resizeMode={"cover"}
                source={require("../assets/ok.png")}
              />
            )}
            {ok == 0 && (
              <Image
                style={styles.check}
                resizeMode={"cover"}
                source={require("../assets/wrong.png")}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#565D7A",
    paddingVertical: 12,
    paddingHorizontal: 6,
    width: (Dimensions.get("window").width * 80) / 100,
    backgroundColor: "#171D37",
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonFlag: {
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#565D7A",
    paddingVertical: 12,
    paddingHorizontal: 6,
    width: (Dimensions.get("window").width * 35) / 100,
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
  leftSideFlag: {
    width: (Dimensions.get("window").width * 20) / 100,
  },
  flag: {
    width: (Dimensions.get("window").width * 12) / 100,
    height: (Dimensions.get("window").width * 8) / 100,
  },
});
