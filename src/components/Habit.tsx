import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useAppDispatch } from "../store/hooks";
import { deleteHabit, HabitState, toggleHabitStatus } from "../store/reducers/habitSlice";
import { dateFormat, getTodayDate, reArrangeArray } from "../utils/date";
import Model from "./Model";

type HabitProps = {
  habitDetails: HabitState,
  index: number
  date: string,
  pastMonths: (Date | null)[][]
}

const Habit = ({ habitDetails, index, date, pastMonths }: HabitProps) => {
  const dispatch = useAppDispatch()
  const [isModelOpen, setIsModelOpen] = useState(false)
  const today = new Date()

  const handleDelete = () => {
    dispatch(deleteHabit(index))
  }
  return (
    <View style={styles.container}>
      <View style={styles.habitItem}>
        <View style={styles.firstContainer}>
          <TouchableOpacity
            // style={styles.addButton}
            onPress={() =>
              dispatch(toggleHabitStatus({ index, date: getTodayDate() }))
            }
          >
            <Ionicons
              name={
                habitDetails.checklist[date]
                  ? "checkmark-circle"
                  : "checkmark-circle-outline"
              }
              size={30}
              color="#5dd952ff"
            />
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
          <Model
            isModelOpen={isModelOpen}
            setIsModelOpen={setIsModelOpen}
            index={index}
            initialHabitDetails={habitDetails}
          />
        </View>
      </View>

      <ScrollView horizontal style={styles.months}>
        {pastMonths.map((month, index) => (
         <View> 
          <FlatList
            key={index}
            style={styles.month}
            contentContainerStyle={styles.monthContainer}
            data={reArrangeArray(month)}
            renderItem={({ item }) => <View style={styles.week}>{item.map((date,i) => <View key={i} style={[styles.date,
            {
              backgroundColor:
                date === null
                  ? '#1E1E2E'   // empty slot 
                  : habitDetails.checklist[dateFormat(date)]
                    ? '#54eda3ff' // completed 
                    : date > today
                      ? '#044868ff' // future 
                      : '#FF4081' // missed 
            }

            ]}>
              <Text style={{color:'black', textAlign:'center', fontSize:8}} >{date?.getDate()}</Text>
              </View>)}</View>}
          />
          <Text style={{textAlign:"center", color:'white'}}>
            {month[15]?.toLocaleString('default',{month:'short'})}
          </Text>
          </View>
          
        ))}
      </ScrollView>

      {/* <View style={styles.dates}>
      {pastMonths.map((date,index)=>(
        <View key={index}  style={[styles.date, {backgroundColor:`${habitDetails.checklist[date]?'green':'gray'}`}]} ></View>
      ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e293b", // dark card
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  habitItem: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'green'

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
    gap: 6,

  },
  btnContainer: {
    // alignSelf: 'baseline',
    flexDirection: 'row-reverse',
    gap: 10
  },
  deleteBtn: {

  },
  editBtn: {

  },
  months: {
    // backgroundColor:'yellow',
  },

  month: {
    margin: 4,
    // borderWidth:1,
    // borderColor:'black',
    // backgroundColor:'red',
    flexDirection: 'row',
  },

  monthContainer: {
    // padding:1,
    // flex:1,
    // backgroundColor:'red'
    // flexDirection:'column',
    // justifyContent:'space-around',
    // alignItems:'center'
  },


  week: {
    // boxSizing:'border-box',
    // marginTop:12,
    // padding:10,
    // gap:3,
    flex: 1,
    flexDirection: 'column',
    // flexWrap:'wrap-reverse',
    // backgroundColor:'yellow'
  }
  ,
  date: {
    // boxSizing:'border-box',
    // flex:1,
    // flexBasis:'14%',
    aspectRatio: 1,
    margin: 0.8,
    height: 12,
    width: 12,
    borderRadius: 2,
    // backgroundColor:'gray',
    // borderWidth: 1, 
    borderColor: 'black',
  }
})

export default Habit;
