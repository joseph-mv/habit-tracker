import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch } from "../store/hooks";
import { deleteHabit, HabitState, toggleHabitStatus } from "../store/reducers/habitSlice";
import { getLastNDays, getTodayDate } from "../utils/date";
import Model from "./Model";

type HabitProps = {
  habitDetails: HabitState,
  index: number
  date: string,
  pastDates:string[]
}

const Habit = ({ habitDetails, index, date,pastDates }: HabitProps) => {
  const dispatch = useAppDispatch()
  const [isModelOpen, setIsModelOpen] = useState(false)

  const handleDelete = () => {
    dispatch(deleteHabit(index))
  }
  return (
    <View style={styles.container}>
      <View style={styles.habitItem}>

        <View style={styles.firstContainer}>

          <TouchableOpacity
            // style={styles.addButton}
            onPress={() => dispatch(toggleHabitStatus({ index, date: getTodayDate() }))}
          >
            <Ionicons name={habitDetails.checklist[date] ? "checkmark-circle" : "checkmark-circle-outline"} size={30} color="#5dd952ff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.habitName}>{habitDetails.name}</Text>
            <Text style={styles.habitNotes}>{habitDetails.notes}</Text>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            // style={styles.addButton}
            onPress={handleDelete}
          >
            <Ionicons name="trash" size={18} color="red" />
          </TouchableOpacity>

          <TouchableOpacity
            // style={styles.addButton}
            onPress={() => setIsModelOpen(true)}
          >
            <Ionicons name="pencil" size={18} color="orange" />
          </TouchableOpacity>
          <Model isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} index={index} initialHabitDetails={habitDetails} />
        </View>

      </View>

      <View style={styles.dates}>
      {pastDates.map((date,index)=>(
        <View key={index}  style={[styles.date, {backgroundColor:`${habitDetails.checklist[date]?'green':'gray'}`}]} ></View>
      ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#1e293b", // dark card
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  habitItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   
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
  firstContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    gap: 6
  },
  btnContainer: {
    alignSelf: 'baseline',
    flexDirection: 'row-reverse',
    gap: 10
  },
  deleteBtn: {

  },
  editBtn: {

  },
  dates:{
    boxSizing:'border-box',
    marginTop:12,
    // gap:3,
    flex:1,
    flexDirection:'row-reverse',
    flexWrap:'wrap-reverse',
    backgroundColor:'yellow'
  }
  ,
  date:{
    boxSizing:'border-box',
    flex:1,
    flexBasis:'6.66%',
    height:10,
    backgroundColor:'gray',
    borderWidth: 2, 
    borderColor: 'black',
  }
})

export default Habit;
