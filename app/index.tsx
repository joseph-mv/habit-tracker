import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Habit Tracker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'black',
    flex:1
  },
  heading: {
    margin: 2,
    color: "red",
    fontSize: 20,
    fontWeight: "800",
    fontFamily: "serif",
  },
});
