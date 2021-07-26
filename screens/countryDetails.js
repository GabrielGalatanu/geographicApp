import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";

import AnimatedLoader from "react-native-animated-loader";
import TimezonePicker from "../components/timezonePicker";

import CountryCell from "../components/countryCell";
import countryListAlpha3 from "../data/countryListAlpha3";
import apiKeyExchangeRatesApi from "../data/apiKeyExchangeRatesApi";

import * as Localization from "expo-localization";
import i18n from "i18n-js";

export default function CountryDetails(props) {
  const [country, setCountry] = useState({});
  const [currencyValue, setCurrencyValue] = useState(0);
  const [flagUrl, setFlagUrl] = useState("-");
  const [visible, setVisible] = useState(true);
  const [neighbours, setNeighbours] = useState([]);
  const [hours, setHours] = useState("-");
  const [minutes, setMinutes] = useState("-");
  const [seconds, setSeconds] = useState("-");
  const [utcTimes, setUtcTimes] = useState([]);
  const [utcTimeSelected, setUtcTimeSelected] = useState(0);
  const [doneReceivingData, setDoneReceivingData] = useState(false);

  let separationLine = "#2B5C6B";
  let date = new Date();

  let countryTimeInterval;

  useEffect(() => {
    getCountryFromApiAsync();

    countryTimeInterval = setInterval(() => timeCounter(), 1000);

    return () => {
      clearInterval(countryTimeInterval);
    };
  }, []);

  useEffect(() => {
    if (country[0] != undefined) {
      localTimeCalculator();
      getExchangeRateApiAsync();

      setFlagUrl(
        "https://www.countryflags.io/" + country[0].alpha2Code + "/flat/64.png"
      );

      let countries = [];

      for (let i = 0; i < country[0].borders.length; i++) {
        countries.push(countryListAlpha3[country[0].borders[i]]);
      }

      for (let i = 0; i < countries.length; i++) {
        getNeighboursApiAsync(countries[i], i);
      }

      setDoneReceivingData(true);
    }
  }, [country]);

  useEffect(() => {
    localTimeCalculator();
  }, [utcTimeSelected]);

  const getCountryFromApiAsync = async () => {
    try {
      let url = "https://restcountries.eu/rest/v2/name/";
      let continent = props.navigation.getParam("country").name;
      let filters =
        "?fields=name;alpha2Code;capital;population;area;timezones;flag;borders;currencies;";

      let toFetchUrl = url + continent + filters;

      let response = await fetch(toFetchUrl);
      let json = await response.json();

      setCountry(json);
    } catch (error) {
      console.log(error);
    }
  };

  const getNeighboursApiAsync = async (count, index) => {
    try {
      let url = "https://restcountries.eu/rest/v2/name/";
      let continent = count;
      let filters = "?fields=name;alpha2Code;flag";

      let toFetchUrl = url + continent + filters;

      let response = await fetch(toFetchUrl);
      let json = await response.json();

      setNeighbours((prevSelected) => [...prevSelected, json[0]]);
    } catch (error) {
      console.log(error);
    }
  };

  const getExchangeRateApiAsync = async () => {
    try {
      let url = "http://api.exchangeratesapi.io/v1/latest?";
      let apiKey = "access_key=" + apiKeyExchangeRatesApi;
      let symbols =
        "&symbols=" +
        country[0].currencies[0].code +
        "," +
        Localization.currency;

      let toFetchUrl = url + apiKey + symbols;

      // COMMENTED BECAUSE I HAVE LIMITED AMOUNT OF REQUESTS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      let response = await fetch(toFetchUrl);
      let json = await response.json();

      let value =
        json.rates[Localization.currency] /
        json.rates[country[0].currencies[0].code];

      setCurrencyValue(value.toFixed(3));

      // COMMENTED BECAUSE I HAVE LIMITED AMOUNT OF REQUESTS //
    } catch (error) {
      console.log(error);
    }
  };

  const localTimeCalculator = () => {
    if (country[0] != undefined) {
      setUtcTimes(country[0].timezones);

      let extraMinutes = 0;

      let utc = country[0].timezones[utcTimeSelected];
      utc = utc.replace("UTC", "");
      utc = utc.replace(":00", "");

      if (utc.includes(":30")) {
        utc = utc.replace(":30", "");
        if (utc.includes("+")) {
          extraMinutes = 30;
        } else {
          extraMinutes = -30;
        }
      }

      if (utc == "") {
        utc = 0;
      } else {
        utc = parseInt(utc) > 0 ? parseInt(utc) : parseInt(utc) + 24;
      }

      if (extraMinutes == 0) {
        if ((date.getUTCHours() + utc) % 24 < 10) {
          setHours("0" + ((date.getUTCHours() + utc) % 24));
        } else {
          setHours((date.getUTCHours() + utc) % 24);
        }

        if (date.getUTCMinutes() < 10) {
          setMinutes("0" + date.getUTCMinutes());
        } else {
          setMinutes(date.getUTCMinutes());
        }
      } else {
        if (date.getUTCMinutes() + extraMinutes > 59) {
          // if minutes + 30 > 59, i need to add 1 to hours
          if ((date.getUTCHours() + utc + 1) % 24 < 10) {
            setHours("0" + ((date.getUTCHours() + utc + 1) % 24));
          } else {
            setHours((date.getUTCHours() + utc + 1) % 24);
          }
        } else if (date.getUTCMinutes() + extraMinutes < 0) {
          // if minutes - 30 < 0, i need to substract 1 from hours
          if ((date.getUTCHours() + utc - 1) % 24 < 10) {
            setHours("0" + ((date.getUTCHours() + utc - 1) % 24));
          } else {
            setHours((date.getUTCHours() + utc - 1) % 24);
          }
        } else {
          if ((date.getUTCHours() + utc) % 24 < 10) {
            // if minutes +- 30  > 0 && < 59, then hours remains unchanged.
            setHours("0" + ((date.getUTCHours() + utc) % 24));
          } else {
            setHours((date.getUTCHours() + utc) % 24);
          }
        }

        if ((date.getUTCMinutes() + extraMinutes + 60) % 60 < 10) {
          setMinutes("0" + ((date.getUTCMinutes() + extraMinutes + 60) % 60));
        } else {
          setMinutes((date.getUTCMinutes() + extraMinutes + 60) % 60);
        }
      }

      if (date.getUTCSeconds() < 10) {
        setSeconds("0" + date.getUTCSeconds());
      } else {
        setSeconds(date.getUTCSeconds());
      }
    } else {
      console.log("country is undefined");
      console.log(country[0]);
    }
  };

  const timeCounter = () => {
    setSeconds((x) => {
      if (parseInt(x) + 1 > 59) {
        setMinutes((y) => {
          if (parseInt(y) + 1 > 59) {
            setHours((z) => {
              if (parseInt(z) + 1 < 10) {
                return "0" + (parseInt(z) + 1);
              }
              return parseInt(z) + 1;
            });
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

  const navigateToScreen = (neighbour) => {
    props.navigation.push("CountryDetails", { country: neighbour });
  };

  if (country[0] != undefined && doneReceivingData == true)
    return (
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground
            opacity={0.2}
            source={require("../assets/NAmerica2.png")}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={styles.flagContainer}>
              <Image
                style={styles.flag}
                resizeMode={"cover"}
                source={{
                  uri: flagUrl,
                }}
              />
            </View>

            <View style={styles.countryNameContainer}>
              <Text style={styles.countryNameText}>
                {country[0].name}({country[0].alpha2Code})
              </Text>
            </View>

            <View style={styles.detailsLine}>
              <View style={{ flex: 1, height: 2, backgroundColor: "white" }} />
              <View>
                <Text
                  style={{ width: 70, textAlign: "center", color: "white" }}
                >
                  Details
                </Text>
              </View>
              <View style={{ flex: 1, height: 2, backgroundColor: "white" }} />
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.countryNameText}>
                Capital: {country[0].capital}
              </Text>

              <View style={styles.separationLine}>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: separationLine,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: separationLine,
                  }}
                />
              </View>

              <Text style={styles.countryNameText}>
                Population: {country[0].population}
              </Text>

              <View style={styles.separationLine}>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: separationLine,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: separationLine,
                  }}
                />
              </View>

              <Text style={styles.countryNameText}>
                Area: {country[0].area} Km²
              </Text>

              <View style={styles.separationLine}>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: separationLine,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: separationLine,
                  }}
                />
              </View>

              <View style={styles.countryTimeContainer}>
                <Text style={styles.countryNameText}>
                  Local Time: {hours}:{minutes}:{seconds}
                </Text>

                <TimezonePicker
                  timezones={utcTimes}
                  setUtcTime={(value) => setUtcTimeSelected(value)}
                />
              </View>

              <View style={styles.separationLine}>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: separationLine,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: separationLine,
                  }}
                />
              </View>

              <Text style={styles.countryNameText}>
                Currency: {country[0].currencies[0].code} (1{" "}
                {country[0].currencies[0].code} = {currencyValue}{" "}
                {Localization.currency} )
              </Text>
            </View>
            <View style={styles.detailsLine}>
              <View style={{ flex: 1, height: 2, backgroundColor: "white" }} />
              <View>
                <Text
                  style={{ width: 100, textAlign: "center", color: "white" }}
                >
                  Neighbours
                </Text>
              </View>
              <View style={{ flex: 1, height: 2, backgroundColor: "white" }} />
            </View>

            <View style={styles.neighboursContainer}>
              {neighbours.map((neighbour) => {
                if (neighbour != undefined) {
                  return (
                    <CountryCell
                      key={neighbour.alpha2Code}
                      alpha2Code={neighbour.alpha2Code}
                      country={neighbour.name}
                      onPress={() => navigateToScreen(neighbour)}
                    />
                  );
                }
              })}
            </View>

            <View style={styles.detailsContainer}></View>
          </ImageBackground>
        </View>
      </ScrollView>
    );

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
let font = "Mitr-Regular";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#354272",
    alignItems: "center",
  },
  containerAnimation: {
    width: 100,
    height: 100,
  },
  flagContainer: {
    marginTop: 5,
    width: (Dimensions.get("window").width * 80) / 100,
    height: (Dimensions.get("window").width * 50) / 100,
    alignItems: "center",
    justifyContent: "center",
  },
  flag: {
    width: (Dimensions.get("window").width * 60) / 100,
    height: (Dimensions.get("window").width * 40) / 100,
  },
  countryNameContainer: {
    marginTop: 5,
    width: (Dimensions.get("window").width * 90) / 100,
    height: (Dimensions.get("window").width * 10) / 100,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsLine: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  separationLine: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  detailsContainer: {
    marginTop: 5,
    width: (Dimensions.get("window").width * 95) / 100,
    height: (Dimensions.get("window").width * 50) / 100,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  neighboursContainer: {
    marginTop: 5,
    width: (Dimensions.get("window").width * 95) / 100,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  countryNameText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
    fontFamily: font,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  countryTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
