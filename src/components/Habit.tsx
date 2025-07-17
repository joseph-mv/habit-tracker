import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HabitState } from "../store/reducers/habitSlice";

const Habit = ({item}:{item:HabitState}) => {
  return (
    <View style={styles.habitItem}>
      <Text style={styles.habitName}>{item.name}</Text>
      <Text style={styles.habitNotes}>{item.notes}</Text>     
    </View>
  );
};

const styles = StyleSheet.create({
    habitItem: {
    backgroundColor: "#1e293b", // dark card
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  habitName: {
    fontSize: 18,
    color: "#facc15", // yellow-400
    fontWeight: "bold",
    marginBottom: 4,
  },
  habitNotes: {
    fontSize: 14,
    color: "#cbd5e1", // gray-300
  },
})

export default Habit;
