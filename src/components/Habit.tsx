import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch } from "../store/hooks";
import { deleteHabit, HabitState } from "../store/reducers/habitSlice";
import Model from "./Model";

const Habit = ({habitDetails, index}:{habitDetails:HabitState, index:number}) => {
  const dispatch = useAppDispatch()
  const [isModelOpen, setIsModelOpen] = useState(false)
  
  const handleDelete=()=>{
    dispatch(deleteHabit(index))
  }
  return (
    <View style={styles.habitItem}>
      <View>
      <Text style={styles.habitName}>{habitDetails.name}</Text>
      <Text style={styles.habitNotes}>{habitDetails.notes}</Text>  
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
      <Model isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} index={index} initialHabitDetails={habitDetails}/>
        
      </View>   
    </View>
  );
};

const styles = StyleSheet.create({
    habitItem: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
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
  btnContainer:{
    alignSelf:'baseline',
    flexDirection:'row-reverse',
    gap:10
  },
  deleteBtn:{

  },
  editBtn:{

  },
})

export default Habit;
