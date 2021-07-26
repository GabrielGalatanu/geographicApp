import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import AnimatedLoader from "react-native-animated-loader";

import CompletionBar from "../components/completionBar";
import QuizButtonFlag from "../components/quizButtonFlag";

export default function QuizGameFlags(props) {
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
      if (props.navigation.getParam("type") == "Flag")
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
      setShuffleVariantsArray((prevArray) => {
        return prevArray.concat(shuffleVariants);
      });
  }, [shuffleVariants]);

  const getCountriesFromApiAsync = async () => {
    try {
      let url = "https://restcountries.eu/rest/v2/region/";
      let continent = props.navigation.getParam("region");
      let filters = "?fields=name;alpha2Code";

      let toFetchUrl = url + continent + filters;

      let response = await fetch(toFetchUrl);
      let json = await response.json();

      setCountries(json);
    } catch (error) {
      console.log(error);
    }
  };

  const generateCapitalQuestions = () => {
    //i am chosing the countries i want to ask which capital they have.
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
    }

    //i am creating an answer array. the format is: correct, wrong, wrong, wrong, correct, wrong, wrong, wrong.
    let countryAnswer = [];

    for (let i = 0; i < props.navigation.getParam("questionsCount"); i++) {
      countryAnswer[i * 4] = countryQuestion[i];

      for (let j = 0; j < 3; j++) {
        let random = Math.floor(Math.random() * countries.length);
        let ok = true;

        if (random == countryAnswer[i * 4]) {
          j--;
          continue;
        }

        if (j != 0) {
          for (let z = 0; z < j; z++) {
            if (random == countryAnswer[i * 4 + z + 1]) {
              ok = false;
              break;
            }
          }
        }

        if (ok == false) {
          j--;
          continue;
        }

        countryAnswer[i * 4 + j + 1] = random;
      }
    }

    setQuestions(countryAnswer);
  };

  function toShuffle(counter) {
    let toShuffle = [];
    let index = 0;
    for (let i = counter * 4; i < counter * 4 + 4; i++) {
      toShuffle[index] = questions[i];
      index++;
    }

    return shuffle(toShuffle);
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

      if (shuffleVariants[variantChosen] == questions[questionCounter * 4]) {
        let bar = [];
        bar = completionBarStatus;
        bar[questionCounter] = 0;
        setCompletionBarStatus(bar);
      } else {
        let bar = [];
        bar = completionBarStatus;
        bar[questionCounter] = 1;
        setCompletionBarStatus(bar);
      }

      setVariants([0, 0, 0, 0]);
      setQuestionCounter((prevCounter) => prevCounter + 1);
    }
  };

  const variantButtonPressed = (index) => {
    let temp = [0, 0, 0, 0];
    temp[index] = 1;

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
                What is the flag of{" "}
                {countries[questions[questionCounter * 4]].name}?
              </Text>
            </View>

            <View style={styles.answerOptionsContainer}>
              <QuizButtonFlag
                index={0}
                alpha2Code={countries[shuffleVariants[0]].alpha2Code}
                //text="asd"
                ok={variants[0]}
                onPress={(index) => variantButtonPressed(index)}
              />
              <QuizButtonFlag
                index={1}
                alpha2Code={countries[shuffleVariants[1]].alpha2Code}
                ok={variants[1]}
                onPress={(index) => variantButtonPressed(index)}
              />
              <QuizButtonFlag
                index={2}
                alpha2Code={countries[shuffleVariants[2]].alpha2Code}
                ok={variants[2]}
                onPress={(index) => variantButtonPressed(index)}
              />
              <QuizButtonFlag
                index={3}
                alpha2Code={countries[shuffleVariants[3]].alpha2Code}
                ok={variants[3]}
                onPress={(index) => variantButtonPressed(index)}
              />
            </View>
          </View>
          <View style={styles.bottomContainer}>

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
            source={require("../assets/loading3.json")}
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
    justifyContent: "center",
  },
  quizQuestionCounterContainerText: {
    color: "white",
    fontSize: 30,
    fontFamily: "Mitr-Regular",
  },
  completionBarContainer: {
    height: (Dimensions.get("window").width * 5) / 100,
  },
  questionContainer: {
    height: (Dimensions.get("window").width * 30) / 100,
    marginTop: 30,
    marginLeft: 4,
    marginRight: 4,
    justifyContent: "center",
  },
  questionContainerText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Mitr-Regular",
    textAlign: "center",
  },
  answerOptionsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: (Dimensions.get("window").height * 10) / 100,
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
    fontFamily: "Mitr-Regular",
  },
  nextButton: {
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
