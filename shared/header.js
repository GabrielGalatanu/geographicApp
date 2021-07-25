import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({title}) {
  return (
    <View style={styles.header}>
      {/* icon */}
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#F4F5F6",
    letterSpacing: 1,
    
  },
});
