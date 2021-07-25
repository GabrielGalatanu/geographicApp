import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  FlatList,
} from "react-native";

import StatisticsCellDetailed from "../components/statisticsCellDetailed";
import AnimatedLoader from "react-native-animated-loader";

export default function StatisticsListDetailed(props) {
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [shuffle, setShuffle] = useState([]);
  const [capitalData, setCapitalData] = useState({});

  useEffect(() => {
    setData(props.navigation.getParam("item"));
    console.log(props.navigation.getParam("item"));
  }, []);

  useEffect(() => {
    let questions = [];
    let answers = [];
    let shuffle = [];

    if (data.type == "Capital" || data.type == "Flag") {
      for (let i = 0; i < data.numberQuestions; i++) {
        answers[i] = {
          0: data.answers[i * 4],
          1: data.answers[i * 4 + 1],
          2: data.answers[i * 4 + 2],
          3: data.answers[i * 4 + 3],
        };
        questions[i] = {
          key: i,
          0: data.questions[i * 4],
          1: data.questions[i * 4 + 1],
          2: data.questions[i * 4 + 2],
          3: data.questions[i * 4 + 3],
        };
        shuffle[i] = {
          0: data.shuffleVariantsArray[i * 4],
          1: data.shuffleVariantsArray[i * 4 + 1],
          2: data.shuffleVariantsArray[i * 4 + 2],
          3: data.shuffleVariantsArray[i * 4 + 3],
        };
      }
    } else if (data.type == "Neighbours") {
      for (let i = 0; i < data.numberQuestions; i++) {
        answers[i] = {
          0: data.answers[i * 4],
          1: data.answers[i * 4 + 1],
          2: data.answers[i * 4 + 2],
          3: data.answers[i * 4 + 3],
        };
        questions[i] = {
          key: i,
          0: data.questions[i * 5],
          1: data.questions[i * 5 + 1],
          2: data.questions[i * 5 + 2],
          3: data.questions[i * 5 + 3],
          4: data.questions[i * 5 + 4],
        };
        shuffle[i] = {
          0: data.shuffleVariantsArray[i * 4],
          1: data.shuffleVariantsArray[i * 4 + 1],
          2: data.shuffleVariantsArray[i * 4 + 2],
          3: data.shuffleVariantsArray[i * 4 + 3],
        };
      }
    }

    setAnswers(answers);
    setQuestions(questions);
    setShuffle(shuffle);
  }, [data]);

  useEffect(() => {
    if (data.type == "Capital" || data.type == "Flag") {
      getCapitalDataFromApiAsync();
    }
  }, [questions]);

  const navigateToScreen = () => {
    props.navigation.navigate("Home");
  };

  const getCapitalDataFromApiAsync = async () => {
    try {
      let url = "https://restcountries.eu/rest/v2/region/";
      let continent = data.region;
      let filters = "?fields=name;capital;alpha2Code";

      let toFetchUrl = url + continent + filters;

      let response = await fetch(toFetchUrl);
      let json = await response.json();

      setCapitalData(json);
    } catch (error) {
      console.log(error);
    }
  };

  if (capitalData.length > 0 && data.type == "Capital") {
    return (
      <View style={styles.container}>
        <ImageBackground
          opacity={0.2}
          source={require("../assets/Europe2.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <FlatList
            data={questions}
            renderItem={({ item }) => (
              <StatisticsCellDetailed
                item={item}
                answers={answers}
                type={data.type}
                //questions={questions}
                capitalData={capitalData}
                shuffle={shuffle}
                // onPress={() => navigateToScreen(item)}
              />
            )}
            keyExtractor={(item) => item.key.toString()}
          />
        </ImageBackground>
      </View>
    );
  } else if (data.type == "Neighbours") {
    return (
      <View style={styles.container}>
        <ImageBackground
          opacity={0.2}
          source={require("../assets/Europe2.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <FlatList
            data={questions}
            renderItem={({ item }) => (
              <StatisticsCellDetailed
                type={data.type}
                item={item}
                answers={answers}
                // questions={questions}
                shuffle={shuffle}
                // onPress={() => navigateToScreen(item)}
              />
            )}
            keyExtractor={(item) => item.key}
          />
        </ImageBackground>
      </View>
    );
  } else if (capitalData.length > 0 && data.type == "Flag") {
    return (
      <View style={styles.container}>
        <ImageBackground
          opacity={0.2}
          source={require("../assets/Europe2.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <FlatList
            data={questions}
            renderItem={({ item }) => (
              <StatisticsCellDetailed
                type={data.type}
                item={item}
                answers={answers}
                capitalData={capitalData}
                // questions={questions}
                shuffle={shuffle}
                // onPress={() => navigateToScreen(item)}
              />
            )}
            keyExtractor={(item) => item.key}
          />
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

// return (
//   <View style={styles.container}>
//     <View style={styles.containerAnimation}>
//       <AnimatedLoader
//         visible={visible}
//         overlayColor="rgba(53,66,113,0)"
//         source={require("./loading3.json")}
//         animationStyle={styles.lottie}
//         speed={1}
//       ></AnimatedLoader>
//     </View>
//   </View>
// );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(53, 66, 114, 1)",
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
