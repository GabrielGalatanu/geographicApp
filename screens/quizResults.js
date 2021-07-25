import { Inter_100Thin } from "@expo-google-fonts/inter";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Button,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QuizResults(props) {
  const [status, setStatus] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [history, setHistory] = useState({});
  const [questionsCount, setQuestionsCount] = useState(0);
  // ASYNC STORAGE ---------------------------------------

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("StatsList");
      return jsonValue != null
        ? setHistory(JSON.parse(jsonValue))
        : setHistory(null);
    } catch (e) {
      // error reading value
    }
  };

  const storeData = async (value) => {
    try {
      let counter = 0;
      let ok = true;
      let data = null;

      if (history != null) {
        data = history;

        while (ok) {
          if (data[counter] != undefined) {
            counter++;
          } else {
            ok = false;
          }
        }
      } else {
        data = [];
      }

      data[counter] = value;
      const jsonValue = JSON.stringify(data);

      await AsyncStorage.setItem("StatsList", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  //TEMPORAR PENTRU A CURATA STORAGE-UL;
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("StatsList");
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  // ASYNC STORAGE ------------------------------------------//////

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let type = props.navigation.getParam("type");
    let completionBar = props.navigation.getParam("completionBarStatus");
    let questions = props.navigation.getParam("questions");
    let answers = props.navigation.getParam("answers");
    let shuffleVariantsArray = props.navigation.getParam(
      "shuffleVariantsArray"
    );

    let counterAnswers = 0;
    let counterQuestions = 0;
    for (let i = 0; i < completionBar.length; i++) {
      if (completionBar[i] == 0) {
        counterAnswers++;
      }
      if (completionBar[i] == 2) break;

      counterQuestions++;
    }

    setQuestionsCount(counterQuestions);

    if (counterQuestions == 5) {
      console.log(counterAnswers);
      if (counterAnswers < 2) {
        setStatus(2);
      } else if (counterAnswers >= 2 && counterAnswers <= 4) {
        setStatus(1);
      } else {
        setStatus(0);
      }
    } else if (counterQuestions == 10) {
      if (counterAnswers < 5) {
        setStatus(2);
      } else if (counterAnswers >= 5 && counterAnswers <= 9) {
        setStatus(1);
      } else {
        setStatus(0);
      }
    } else {
      if (counterAnswers < 8) {
        setStatus(2);
      } else if (counterAnswers >= 8 && counterAnswers <= 14) {
        setStatus(1);
      } else {
        setStatus(0);
      }
    }

    var date = new Date().getDate(); //To get the Current Date
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear(); //To get the Current Year
    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes

    if (date < 10) date = "0" + date;
    if (month < 10) month = "0" + month;
    if (hours < 10) hours = "0" + hours;
    if (min < 10) min = "0" + min;

    date = date + "/" + month + "/" + year + " " + hours + ":" + min;

    removeValue();
    // storeData({
    //   region: props.navigation.getParam("region"),
    //   numberQuestions: counterQuestions,
    //   correctAnswers: counterAnswers,
    //   date: date,
    //   type: type,
    //   completionBar: completionBar,
    //   questions: questions,
    //   answers: answers,
    //   shuffleVariantsArray: shuffleVariantsArray,
    // });

    setCorrectAnswers(counterAnswers);
  }, [history]);

  const navigateToScreen = () => {
    props.navigation.navigate("Home");
  };

  const title = [
    "Congratulations!",
    "Almost There!",
    "You need more practice!",
  ];
  const message = [
    "All the time spent studying has payed off.",
    "You are close to having a perfect score. Keep practicing!",
    "You need to go back and study some more.",
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        opacity={0.2}
        source={require("../assets/Asia2.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.contentContainer}>
          <View style={styles.quizResultContainer}>
            <Text style={styles.quizResultContainerText}>Quiz Results</Text>
          </View>

          {status == 0 && (
            <View style={styles.cupContainer}>
              <Image
                style={styles.cupContainerImage}
                source={require("../assets/gold.png")}
              />
            </View>
          )}

          {status == 1 && (
            <View style={styles.cupContainer}>
              <Image
                style={styles.cupContainerImage}
                source={require("../assets/silver.png")}
              />
            </View>
          )}

          {status == 2 && (
            <View style={styles.cupContainer}>
              <Image
                style={styles.cupContainerImage}
                source={require("../assets/bronze.png")}
              />
            </View>
          )}

          <View style={styles.titleContainer}>
            <Text style={styles.titleContainerText}>{title[status]}</Text>
          </View>

          <View style={styles.messageContainer}>
            <Text style={styles.messageContainerText}>{message[status]}</Text>
          </View>

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreContainerText1}>Your Score</Text>
            <Text style={styles.scoreContainerText2}>
              {correctAnswers}/{questionsCount}
            </Text>
          </View>

          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={() => navigateToScreen()}>
              <View style={styles.doneButton}>
                <Text style={styles.doneButtonText}>Done!</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
  contentContainer: {
    flex: 1,
  },
  quizResultContainer: {
    width: (Dimensions.get("window").width * 95) / 100,
    height: (Dimensions.get("window").height * 10) / 100,
    // borderColor: "red",
    // borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  quizResultContainerText: {
    color: "white",
    fontSize: 25,
    fontFamily: "Mitr-SemiBold",
  },
  cupContainer: {
    width: (Dimensions.get("window").width * 95) / 100,
    height: (Dimensions.get("window").height * 30) / 100,
    // borderColor: "red",
    // borderWidth: 3,
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  cupContainerImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  titleContainer: {
    width: (Dimensions.get("window").width * 95) / 100,
    height: (Dimensions.get("window").height * 8) / 100,
    // borderColor: "red",
    // borderWidth: 3,
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainerText: {
    color: "white",
    fontSize: 25,
    fontFamily: "Mitr-SemiBold",
  },
  messageContainer: {
    width: (Dimensions.get("window").width * 95) / 100,
    height: (Dimensions.get("window").height * 15) / 100,
    // borderColor: "red",
    // borderWidth: 3,
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainerText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Mitr-Regular",
    textAlign: "center",
  },
  scoreContainer: {
    width: (Dimensions.get("window").width * 95) / 100,
    height: (Dimensions.get("window").height * 15) / 100,
    // borderColor: "red",
    // borderWidth: 3,
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreContainerText1: {
    color: "white",
    fontSize: 20,
    fontFamily: "Mitr-Regular",
    textAlign: "center",
  },
  scoreContainerText2: {
    color: "white",
    fontSize: 40,
    fontFamily: "Mitr-SemiBold",
    textAlign: "center",
  },
  bottomContainer: {
    width: (Dimensions.get("window").width * 80) / 100,
    height: (Dimensions.get("window").height * 22) / 100,
    // borderColor: 'red',
    // borderWidth: 2,
    marginBottom: 5,
    justifyContent: "center",
    // flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  doneButton: {
    backgroundColor: "#06CFF2",
    borderRadius: 15,
    width: (Dimensions.get("window").width * 40) / 100,
    height: (Dimensions.get("window").width * 15) / 100,
    justifyContent: "center",
    alignItems: "center",
  },
  doneButtonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Mitr-SemiBold",
  },
});
