import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import StatisticsCellQuestionView from "./statisticsCellQuestionView";

export default function StatisticsCellDetailed(props) {
  if (props.type == "Capital") {
    return (
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionContainerText}>
            What is the capital of {props.capitalData[props.item[0]].name}?
          </Text>
        </View>

        <View style={styles.answerOptionsContainer}>
          <StatisticsCellQuestionView
            index={0}
            type={props.type}
            text={
              props.capitalData[props.shuffle[props.item["key"]][0]].capital
            }
            questionNumber={props.item["key"]}
            questions={props.item}
            answers={props.answers}
            shuffle={props.shuffle}
          />
          <StatisticsCellQuestionView
            index={1}
            type={props.type}
            text={
              props.capitalData[props.shuffle[props.item["key"]][1]].capital
            }
            questionNumber={props.item["key"]}
            questions={props.item}
            answers={props.answers}
            shuffle={props.shuffle}
          />
          <StatisticsCellQuestionView
            index={2}
            type={props.type}
            text={
              props.capitalData[props.shuffle[props.item["key"]][2]].capital
            }
            questionNumber={props.item["key"]}
            questions={props.item}
            answers={props.answers}
            shuffle={props.shuffle}
          />
          <StatisticsCellQuestionView
            index={3}
            type={props.type}
            text={
              props.capitalData[props.shuffle[props.item["key"]][3]].capital
            }
            questionNumber={props.item["key"]}
            questions={props.item}
            answers={props.answers}
            shuffle={props.shuffle}
          />
        </View>
      </View>
    );
  } else if (props.type == "Neighbours") {
    return (
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionContainerText}>
            Who is {props.item[0]} neighbor?
          </Text>
        </View>

        <View style={styles.answerOptionsContainer}>
          <StatisticsCellQuestionView
            index={0}
            text={props.shuffle[props.item["key"]][0]}
            questionNumber={props.item["key"]}
            questions={props.item}
            answers={props.answers}
            shuffle={props.shuffle}
            type={props.type}
          />
          <StatisticsCellQuestionView
            index={1}
            text={props.shuffle[props.item["key"]][1]}
            questionNumber={props.item["key"]}
            questions={props.item}
            answers={props.answers}
            shuffle={props.shuffle}
            type={props.type}
          />
          <StatisticsCellQuestionView
            index={2}
            text={props.shuffle[props.item["key"]][2]}
            questionNumber={props.item["key"]}
            questions={props.item}
            answers={props.answers}
            shuffle={props.shuffle}
            type={props.type}
          />
          <StatisticsCellQuestionView
            index={3}
            text={props.shuffle[props.item["key"]][3]}
            questionNumber={props.item["key"]}
            questions={props.item}
            answers={props.answers}
            shuffle={props.shuffle}
            type={props.type}
          />
        </View>
      </View>
    );
  } else if (props.type == "Flag") {
    return (
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionContainerText}>
            What is the flag of {props.capitalData[props.item[0]].name}?
          </Text>
        </View>

        <View style={styles.answerOptionsContainerFlag}>
          <StatisticsCellQuestionView
            index={0}
            type={props.type}
            text={
              props.capitalData[props.shuffle[props.item["key"]][0]].alpha2Code
            }
            questionNumber={props.item["key"]}
            questions={props.item}
            answers={props.answers}
            shuffle={props.shuffle}
          />
          <StatisticsCellQuestionView
            index={1}
            type={props.type}
            text={
              props.capitalData[props.shuffle[props.item["key"]][1]].alpha2Code
            }
            questionNumber={props.item["key"]}
            questions={props.item}
            answers={props.answers}
            shuffle={props.shuffle}
          />
          <StatisticsCellQuestionView
            index={2}
            type={props.type}
            text={
              props.capitalData[props.shuffle[props.item["key"]][2]].alpha2Code
            }
            questionNumber={props.item["key"]}
            questions={props.item}
            answers={props.answers}
            shuffle={props.shuffle}
          />
          <StatisticsCellQuestionView
            index={3}
            type={props.type}
            text={
              props.capitalData[props.shuffle[props.item["key"]][3]].alpha2Code
            }
            questionNumber={props.item["key"]}
            questions={props.item}
            answers={props.answers}
            shuffle={props.shuffle}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: (Dimensions.get("window").width * 90) / 100,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#2A5C6B",
    backgroundColor: "#272B4A",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  questionContainer: {
    marginTop: 20,
    marginBottom: 20,
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
    marginHorizontal: 10,
  },
  answerOptionsContainerFlag: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
});
