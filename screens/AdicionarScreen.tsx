import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function AdicionarScreen({ navigation }: any) {
  return (
    <View>
      <Text>AdicionarScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.navText}>🏠</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navText: {
    fontSize: 24,
  },
});
