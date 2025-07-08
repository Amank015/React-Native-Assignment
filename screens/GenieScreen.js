// screens/GenieScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function GenieScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>✨ Genie Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
  text: { color: "white", fontSize: 24 },
});
