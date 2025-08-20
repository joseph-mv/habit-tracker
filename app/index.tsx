import DatePicker from "@/src/components/DatePicker"
import Habit from "@/src/components/Habit"
import Model from "@/src/components/Model"
import { useAppSelector } from "@/src/store/hooks"
import { dateFormat, getLastMonths } from "@/src/utils/date"
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
  const [date, setDate] = useState(new Date());
  const pastMonths = getLastMonths(12)

  return (
    <View style={styles.container}>
      <View style ={{flexDirection:'row' , alignItems:'center', justifyContent:'space-between',marginBottom:12}}>
      <DatePicker style={{ width:'auto'}} date={date} setDate={setDate}/>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>{ 
          setIsModelOpen(true)
        }
      }
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
      </View>

      <Model isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} />

      <Text style={styles.heading}>Your Habits</Text>

      <FlatList
        data={habits}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.habitList}
        renderItem={({ item,index }) => (
          <Habit habitDetails={item} index={index} date={dateFormat(date)} pastMonths={pastMonths}/>
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
    backgroundColor: "#2563eb", // blue-600
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
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
