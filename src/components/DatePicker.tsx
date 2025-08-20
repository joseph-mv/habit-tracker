import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle
} from "react-native";
import { dateFormat } from "../utils/date";

// Props type for styling
type DatePickerProps = {
    date: Date,
    setDate: React.Dispatch<React.SetStateAction<Date>>
    style?: ViewStyle;
};

export default function DatePicker({
    date,
    setDate,
    style
}: DatePickerProps) {
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === "android") {
            setShow(false); // close picker on Android
        }
        if (selectedDate) setDate(selectedDate);
    };

      if (Platform.OS === "web") {
    // fallback for web: HTML date input
    return (
      <input
        type="date"
        value={date.toISOString().split("T")[0]}
        onChange={(e) => setDate(new Date(e.target.value))}
         max={new Date().toISOString().split("T")[0]}
      />
    );
  }

    return (
        <View style={[styles.container, style]}>
            {/* Button */}
            <TouchableOpacity
                style={[styles.button]}
                onPress={() => setShow(true)}
            >
                <Text style={styles.buttonText}>
                    {dateFormat(date)}
                </Text>
            </TouchableOpacity>

            {/* Date Picker */}
            {show && (
                <DateTimePicker
                    
                    value={date}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onChange}
                    style={styles.picker}
                    maximumDate={new Date()} // 🚀 restrict to today or earlier
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    button: {
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    dateText: {
        marginTop: 12,
        fontSize: 16,
        color: "#333",
    },
    picker: {
        width: "100%",
        backgroundColor: "white",
    },
});
