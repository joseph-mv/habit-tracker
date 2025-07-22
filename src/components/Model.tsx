import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { useAppDispatch } from "../store/hooks";
import { addHabit, editHabit, HabitState } from "../store/reducers/habitSlice";

// Props for modal
type ModelProps = {
  isModelOpen: boolean;
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialHabitDetails?:HabitState;
  index?:number
};

const Model = ({ isModelOpen, setIsModelOpen,initialHabitDetails,index }: ModelProps) => {
  const dispatch = useAppDispatch();
  const [habitDetails, setHabitDetails] = useState(initialHabitDetails || { name: "", notes: "",checklist:{} });
  
  const handleSave = () => {
    if (habitDetails.name.trim()) {
      if(index || index === 0){
        dispatch(editHabit({index,habit:habitDetails}))
      }else{
        dispatch(addHabit(habitDetails));
        setHabitDetails({name:'',notes:'',checklist:{}})
      }
      setIsModelOpen(false);
    }
  };
  
  const handleClose=() =>{
    setIsModelOpen(false)
    if(!index && index !== 0){
      setHabitDetails({name:'',notes:'',checklist:{}})
    }
  }

  return (
    <Modal
      visible={isModelOpen}
      animationType="slide"
      transparent
      onRequestClose={() => setIsModelOpen(false)}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardContainer}
        >
          <ScrollView contentContainerStyle={styles.modalWrapper}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Add New Habit</Text>

              <TextInput
                style={styles.input}
                placeholder="Habit Title"
                placeholderTextColor="#888"
                value={habitDetails.name}
                onChangeText={(text) =>
                  setHabitDetails((prev) => ({ ...prev, name: text }))
                }
              />

              <TextInput
                style={[styles.input, styles.notesInput]}
                placeholder="Describe your habit goals"
                placeholderTextColor="#888"
                multiline
                numberOfLines={4}
                value={habitDetails.notes}
                onChangeText={(text) =>
                  setHabitDetails((prev) => ({ ...prev, notes: text }))
                }
              />

              <View style={styles.btnContainer}>
                <Pressable style={styles.cancelBtn} onPress={handleClose}>
                  <Text style={styles.btnText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.saveBtn} onPress={handleSave}>
                  <Text style={styles.btnText}>Save</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardContainer: {
    flex: 1,
    width: "100%",
  },
  modalWrapper: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#1f2937", // Tailwind slate-800
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
    textAlign: "center",
  },
  input: {
    height: 48,
    borderColor: "#4b5563", // Tailwind gray-600
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 14,
    backgroundColor: "#111827", // Tailwind gray-900
    color: "#fff",
  },
  notesInput: {
    height: 100,
    textAlignVertical: "top",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#9ca3af", // Tailwind gray-400
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#3b82f6", // Tailwind blue-500
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Model;
