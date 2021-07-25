import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function TimezonePicker(props) {
  const [selectedLanguage, setSelectedLanguage] = useState("sasda");

  const onChangePicker = (itemValue, itemIndex) => {
    //itemindex ma intereseaza;
    props.setUtcTime(itemIndex);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedLanguage}
        style={{ backgroundColor: "red", height: 20, width: 150 }}
        onValueChange={(itemValue, itemIndex) =>
          onChangePicker(itemValue, itemIndex)
        }
      >
        {props.timezones.map((value, index) => {
          return (
            <Picker.Item
              style={styles.pickerText}
              color="black"
              label={value}
              value={value}
            />
          );
        })}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: 'red',
    // borderWidth: 4,
    width: 40,
    height: 30,
  },
  pickerText: {
    color: "white",
    // fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
    fontFamily: "Mitr-Regular",
  },
});
