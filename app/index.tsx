import Habit from "@/src/components/Habit"
import Model from "@/src/components/Model"
import { useAppSelector } from "@/src/store/hooks"
import { getLastNDays, getTodayDate } from "@/src/utils/date"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

export default function Index() {
  const [isModelOpen, setIsModelOpen] = useState(false)
  const habits = useAppSelector((state) => state.habits)
  const date = getTodayDate()

  const pastDates=getLastNDays(60)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModelOpen(true)}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>

      <Model isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} />

      <Text style={styles.heading}>Your Habits</Text>

      <FlatList
        data={habits}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.habitList}
        renderItem={({ item,index }) => (
          <Habit habitDetails={item} index={index} date={date} pastDates={pastDates}/>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No habits added yet.</Text>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // dark slate
    padding: 16,
  },
  heading: {
    color: "#e2e8f0", // light text
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  addButton: {
    alignSelf: "flex-end",
    backgroundColor: "#2563eb", // blue-600
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  habitList: {
    paddingBottom: 20,
  },
  emptyMessage: {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 16,
    marginTop: 40,
  },
})
