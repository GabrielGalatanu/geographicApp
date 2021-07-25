import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import AnimatedLoader from "react-native-animated-loader";

import CompletionBar from "../components/completionBar";
import QuizButton from "../components/quizButton";

import countryListAlpha3 from "../data/countryListAlpha3";

export default function QuizGame(props) {
  const [visible, setVisible] = useState(true);
  const [countries, setCountries] = useState({});
  const [variants, setVariants] = useState([0, 0, 0, 0]);
  const [completionBarStatus, setCompletionBarStatus] = useState([
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  ]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [shuffleVariants, setShuffleVariants] = useState([]);
  const [shuffleVariantsArray, setShuffleVariantsArray] = useState([]);

  const [nextButtonBackgroundColor, setNextButtonBackgroundColor] =
    useState("#555D7A");

  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  let countryTimeInterval;

  const navigateBackToHome = (data) => {
    props.navigation.navigate("Home");
  };

  useEffect(() => {
    getCountriesFromApiAsync();

    countryTimeInterval = setInterval(() => timeCounter(), 1000);

    return () => {
      clearInterval(countryTimeInterval);
    };
  }, []);

  useEffect(() => {
    if (countries.length != undefined) {
      if (props.navigation.getParam("type") == "Neighbours")
        generateCapitalQuestions();
    }
  }, [countries]);

  useEffect(() => {
    setShuffleVariants(toShuffle(questionCounter));
  }, [questions]);

  useEffect(() => {
    if (questionCounter != 0) setShuffleVariants(toShuffle(questionCounter));
    if (questionCounter == props.navigation.getParam("questionsCount")) {
      setVisible(false);
      props.navigation.navigate("QuizResults", {
        region: props.navigation.getParam("region"),
        type: props.navigation.getParam("type"),
        completionBarStatus: completionBarStatus,
        questions: questions,
        shuffleVariantsArray: shuffleVariantsArray,
        answers: answers,
      });
    }
  }, [questionCounter]);

  useEffect(() => {
    let ok = false;
    for (let i = 0; i < variants.length; i++) {
      if (variants[i] == 1) {
        ok = true;
        break;
      }
    }

    if (ok == true) {
      setNextButtonBackgroundColor("#06CFF2");
    } else {
      setNextButtonBackgroundColor("#555D7A");
    }
  }, [variants]);

  useEffect(() => {
    if (
      shuffleVariants[0] != undefined &&
      Number.isNaN(shuffleVariants[0]) == false
    )
      console.log("SHUFFLE ARRAY TO ADD");
    console.log(shuffleVariants);
    setShuffleVariantsArray((prevArray) => {
      return prevArray.concat(shuffleVariants);
    });
  }, [shuffleVariants]);

  const getCountriesFromApiAsync = async () => {
    try {
      let url = "https://restcountries.eu/rest/v2/region/";
      let continent = props.navigation.getParam("region");
      let filters = "?fields=name;capital;borders";

      let toFetchUrl = url + continent + filters;

      let response = await fetch(toFetchUrl);
      let json = await response.json();

      console.log("mda");

      setCountries(json);
    } catch (error) {
      console.log(error);
    }
  };

  const generateCapitalQuestions = () => {
    if (countries.length != undefined) {
      let countryQuestion = [];
      for (let i = 0; i < props.navigation.getParam("questionsCount"); i++) {
        let random = Math.floor(Math.random() * countries.length);
        let ok = true;

        if (i == 0) {
          countryQuestion[i] = random;
        } else {
          for (let j = 0; j < i; j++) {
            if (random == countryQuestion[j]) {
              ok = false;
              break;
            }
          }

          if (ok == false) {
            i--;
            continue;
          }

          countryQuestion[i] = random;
        }
        if (countries[countryQuestion[i]]["borders"].length == 0) {
          i--;
          continue;
        }
      }
      console.log("mda");

      let neightbours = [];

      for (let x = 0; x < props.navigation.getParam("questionsCount"); x++)
        if (countries[countryQuestion[x]]["borders"].length > 0) {
          let random = Math.floor(
            Math.random() * countries[countryQuestion[x]]["borders"].length
          );

          neightbours[x * 5] = countries[countryQuestion[x]].name;

          neightbours[x * 5 + 1] =
            countryListAlpha3[countries[countryQuestion[x]]["borders"][random]];

          let mainCountryNeightbours = countries[countryQuestion[x]]["borders"];

          // ////////////////////////////////////////////////////
          for (let i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * countries.length);
            let ok = true;

            for (let j = x * 5; j < neightbours.length; j++) {
              if (countries[random].name == neightbours[j]) {
                //   console.log(countries[random].name);
                //   console.log(neightbours[j]);
                ok = false;
                break;
              }

              for (let z = 0; z < mainCountryNeightbours.length; z++) {
                if (
                  countryListAlpha3[mainCountryNeightbours[z]] ==
                  countries[random].name
                ) {
                  ok = false;
                  break;
                }
              }
            }

            if (ok == false) {
              i--;
              continue;
            }
            neightbours[x * 5 + i + 2] = countries[random].name;
          }

          // ///////////////////////////////
        } else {
          console.log("nu are vecini");
        }

      console.log(neightbours);
      setQuestions(neightbours);
    }
  };

  function toShuffle(counter) {
    let toShuffle = [];
    let index = 0;

    for (let i = counter * 5 + 1; i < counter * 5 + 4 + 1; i++) {
      toShuffle[index] = questions[i];
      index++;
    }

    if (toShuffle[0] != undefined) {
      return shuffle(toShuffle);
    } else {
      return [];
    }
  }

  function shuffle(array) {
    var currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const nextButtonPressed = () => {
    let variantIsSelected = 0;
    for (let i = 0; i < variants.length; i++) {
      if (variants[i] == 1) {
        variantIsSelected = 1;
        break;
      }
    }

    if (variantIsSelected == 1) {
      let variantChosen = 5;

      setAnswers((prevAnswers) => prevAnswers.concat(variants));

      for (let i = 0; i < 4; i++) {
        if (variants[i] == 1) {
          variantChosen = i;
        }
      }

      if (
        shuffleVariants[variantChosen] == questions[questionCounter * 5 + 1]
      ) {
        //IF THE ANSWER IS CORRECT
        let bar = [];
        bar = completionBarStatus;
        bar[questionCounter] = 0;
        setCompletionBarStatus(bar);
        console.log("correct");
      } else {
        let bar = [];
        bar = completionBarStatus;
        bar[questionCounter] = 1;
        setCompletionBarStatus(bar);
        console.log("gresit");
      }

      // console.log(completionBarStatus);
      setVariants([0, 0, 0, 0]);
      setQuestionCounter((prevCounter) => prevCounter + 1);

      // console.log(shuffleVariants);
      // console.log(questions);
    }
  };

  const variantButtonPressed = (index) => {
    let temp = [0, 0, 0, 0];
    temp[index] = 1;

    // console.log(temp);
    // console.log(variants);

    setVariants(temp);
  };

  const timeCounter = () => {
    setSeconds((x) => {
      if (parseInt(x) + 1 > 59) {
        setMinutes((y) => {
          if (parseInt(y) + 1 > 59) {
            return "00";
          }

          if (parseInt(y) + 1 < 10) {
            return "0" + (parseInt(y) + 1);
          } else {
            return parseInt(y) + 1;
          }
        });

        return "00";
      }

      if (parseInt(x) + 1 < 10) {
        return "0" + (parseInt(x) + 1);
      } else {
        return parseInt(x) + 1;
      }
    });
  };

  if (
    countries.length != undefined &&
    countries.length != 0 &&
    Number.isNaN(questions[0]) == false &&
    Number.isNaN(shuffleVariants[0]) == false &&
    questions.length != 0 &&
    questionCounter < props.navigation.getParam("questionsCount") &&
    shuffleVariants[0] != undefined
  ) {
    return (
      <View style={styles.container}>
        <ImageBackground
          opacity={0.2}
          source={require("../assets/Europe2.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.contentContainer}>
            <View style={styles.quizTypeContainer}>
              <Text style={styles.quizTypeContainerText}>
                {props.navigation.getParam("type")} Quiz
              </Text>
              <Text style={styles.quizTypeContainerTime}>
                {minutes}:{seconds}
              </Text>
            </View>

            <View style={styles.quizQuestionCounterContainer}>
              <Text style={styles.quizQuestionCounterContainerText}>
                Question {questionCounter + 1}/
                {props.navigation.getParam("questionsCount")}
              </Text>
            </View>

            <View style={styles.completionBarContainer}>
              <CompletionBar
                count={props.navigation.getParam("questionsCount")}
                answerArray={completionBarStatus}
              />
            </View>

            <View style={styles.questionContainer}>
              <Text style={styles.questionContainerText}>
                What is the neightbour of {questions[questionCounter * 5]}?
              </Text>
            </View>

            <View style={styles.answerOptionsContainer}>
              <QuizButton
                index={0}
                text={shuffleVariants[0]}
                //text="asd"
                ok={variants[0]}
                onPress={(index) => variantButtonPressed(index)}
              />
              <QuizButton
                index={1}
                text={shuffleVariants[1]}
                ok={variants[1]}
                onPress={(index) => variantButtonPressed(index)}
              />
              <QuizButton
                index={2}
                text={shuffleVariants[2]}
                ok={variants[2]}
                onPress={(index) => variantButtonPressed(index)}
              />
              <QuizButton
                index={3}
                text={shuffleVariants[3]}
                ok={variants[3]}
                onPress={(index) => variantButtonPressed(index)}
              />
            </View>
          </View>
          <View style={styles.bottomContainer}>
            {/* <Button title="go back to home" onPress={navigateBackToHome} /> */}

            <TouchableOpacity onPress={navigateBackToHome}>
              <View style={styles.quitButton}>
                <Text style={styles.quitButtonText}>Quit Quiz</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={nextButtonPressed}>
              <View
                style={[
                  styles.nextButton,
                  { backgroundColor: nextButtonBackgroundColor },
                ]}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.containerAnimation}>
          <AnimatedLoader
            visible={visible}
            overlayColor="rgba(53,66,113,0)"
            source={require("./loading3.json")}
            animationStyle={styles.lottie}
            speed={1}
          ></AnimatedLoader>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#354272",
    // alignItems: "center",
    // justifyContent: "center",
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
  quizTypeContainer: {
    height: (Dimensions.get("window").width * 10) / 100,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  quizTypeContainerText: {
    color: "gray",
    fontSize: 20,
    fontFamily: "Mitr-Regular",
  },
  quizTypeContainerTime: {
    color: "gray",
    fontSize: 20,
    fontFamily: "Mitr-Regular",
  },
  quizQuestionCounterContainer: {
    height: (Dimensions.get("window").width * 10) / 100,

    marginLeft: 10,

    // borderColor: "yellow",
    // borderWidth: 2,
    justifyContent: "center",
  },
  quizQuestionCounterContainerText: {
    color: "white",
    fontSize: 30,
    fontFamily: "Mitr-Regular",
    //fontFamily: "Mitr-SemiBold",
    //fontFamily: "OtomanopeeOne-Regular"
  },
  completionBarContainer: {
    // borderColor: "red",
    // borderWidth: 2,
    height: (Dimensions.get("window").width * 5) / 100,
  },
  questionContainer: {
    height: (Dimensions.get("window").width * 30) / 100,
    marginTop: 30,
    marginLeft: 4,
    marginRight: 4,
    // borderColor: "yellow",
    // borderWidth: 2,
    justifyContent: "center",
  },
  questionContainerText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Mitr-Regular",
    textAlign: "center",
  },
  answerOptionsContainer: {
    marginTop: 30,
    // borderColor: "red",
    // borderWidth: 2,
    height: (Dimensions.get("window").width * 60) / 100,
    marginHorizontal: 10,
  },
  bottomContainer: {
    width: (Dimensions.get("window").width * 100) / 100,
    height: (Dimensions.get("window").width * 20) / 100,

    marginBottom: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  quitButton: {
    borderRadius: 15,
    marginRight: 15,
    width: (Dimensions.get("window").width * 40) / 100,
    height: (Dimensions.get("window").width * 15) / 100,
    justifyContent: "center",
    alignItems: "center",
  },
  quitButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    //fontFamily: "Mitr-Regular",
    fontFamily: "Mitr-Regular",
  },
  nextButton: {
    //backgroundColor: "#06CFF2",
    borderRadius: 15,
    marginRight: 15,
    width: (Dimensions.get("window").width * 40) / 100,
    height: (Dimensions.get("window").width * 15) / 100,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Mitr-SemiBold",
  },
});
