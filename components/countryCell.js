import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";

export default function CountryCell({ alpha2Code, country, onPress }) {
  let countryFlagUrl =
    "https://www.countryflags.io/" + alpha2Code + "/flat/64.png";

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.parent}>
        <View style={styles.narrow}>
          <Image
            style={styles.logo}
            resizeMode={"cover"}
            source={{
              uri: countryFlagUrl,
            }}
          />
        </View>

        <View style={styles.wide}>
          <Text style={styles.countryText}>
            {country} ({alpha2Code})
          </Text>
        </View>
      </View>
      <View style={styles.container}></View>
    </TouchableOpacity>
  );
}

const borderRadiusValue = 5;
const borderWidthValue = 5;
const borderColorValue = "#2A5C6B";
const backgroundColor = "#272B4A";

const styles = StyleSheet.create({
  button: {},
  parent: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    width: (Dimensions.get("window").width * 90) / 100,
    height: 80,
  },
  narrow: {
    flex: 1,
    backgroundColor: backgroundColor,
    borderWidth: borderWidthValue,
    borderRightWidth: 0,
    borderTopLeftRadius: borderRadiusValue,
    borderBottomLeftRadius: borderRadiusValue,
    borderColor: borderColorValue,
    justifyContent: "center",
    alignItems: "center",
  },
  wide: {
    flex: 2,
    backgroundColor: backgroundColor,
    borderWidth: borderWidthValue,
    borderLeftWidth: 0,
    borderTopRightRadius: borderRadiusValue,
    borderBottomRightRadius: borderRadiusValue,
    borderColor: borderColorValue,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  logo: {
    width: 80,
    height: 80,
  },
  countryText: {
    fontSize: 15,
    color: "#F4F5F6",
    letterSpacing: 1,
    fontFamily: "Mitr-SemiBold",
  },
});
