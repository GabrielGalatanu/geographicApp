import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, ImageBackground } from "react-native";

import CountryCell from "../components/countryCell";

export default function Countries(props) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountriesFromApiAsync();
  }, []);

  const getCountriesFromApiAsync = async () => {
    
    try {
      let url = "https://restcountries.eu/rest/v2/region/";
      let continent = props.navigation.getParam("continent");
      let filters = "?fields=name;alpha2Code;flag";

      let toFetchUrl = url + continent + filters;

      let response = await fetch(toFetchUrl);
      let json = await response.json();

      setCountries(json);
      //return json.movies;
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToScreen = (country) => {
    props.navigation.navigate("CountryDetails", { country: country });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        opacity={0.2}
        source={require("../assets/NAmerica2.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <FlatList
          data={countries}
          renderItem={({ item }) => (
            <CountryCell
              alpha2Code={item.alpha2Code}
              country={item.name}
              onPress={() => navigateToScreen(item)}
            />
          )}
          keyExtractor={(item, index) => item.alpha2Code}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#354272",
    alignItems: "center",
    // paddingHorizontal: 20,
  },
  item: {
    marginTop: 10,
    padding: 30,
    backgroundColor: "pink",
    fontSize: 24,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
