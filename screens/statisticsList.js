import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import StatisticsCell from "../components/statisticsCell";

export default function StatisticsList(props) {
  const [localData, setLocalData] = useState({});
  const [history, setHistory] = useState([]);
  const [historyCounter, setHistoryCounter] = useState(0);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("StatsList");

      return jsonValue != null ? setLocalData(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const data = Object.values(localData);

    setHistory(data);
  }, [localData]);

  useEffect(() => {
    setHistoryCounter(history.length);
  }, [history]);

  const navigateToScreen = () => {
    props.navigation.navigate("Home");
  };

  const onPressStatisticsCell = (item) => {
    props.navigation.navigate("StatisticsListDetailed", { item: item });
  };

  if (historyCounter != 0) {
    return (
      <View style={styles.container}>
        <ImageBackground
          opacity={0.2}
          source={require("../assets/Europe2.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <FlatList
            data={history}
            renderItem={({ item }) => (
              <StatisticsCell
                onPress={(item) => onPressStatisticsCell(item)}
                item={item}
              />
            )}
            keyExtractor={(item, index) => item.date}
          />
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          opacity={0.2}
          source={require("../assets/Europe2.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.noHistoryText}>No history</Text>
        </ImageBackground>
      </View>
    );
  }
}

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
  noHistoryText: {
    color: "white",
    // fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
    fontFamily: "Mitr-Regular",
  },
});
