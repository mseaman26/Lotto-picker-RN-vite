import { Pressable, View, Text, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {weekdaysString} from '../../utils/lottoStructurer';

interface DatePickerProps {
    drawDate: Date | null;
    setDrawDate: any;
    days: number[];
}

 const DatePickerExpo =  ({setDrawDate, drawDate, days}: DatePickerProps) => {

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);


    const onChange = (event, selectedDate) => {
        console.log('days', days);
        if (event.type === "set") { // Ensure the user selected a date
            const currentDate = selectedDate || new Date();

            // Get the current day of the week: 0 = Sunday, 3 = Wednesday, 6 = Saturday
            const dayOfWeek = currentDate.getDay();
            const today = new Date();
            today.setHours(0, 0, 0, 0);  // Reset to midnight for accurate comparison

            // Check if the selected day is Wednesday (3) or Saturday (6) and not in the past
            if (days.includes(dayOfWeek) && currentDate >= today) {
                setDrawDate(currentDate);  // Valid date: update state
            } else {
                // If the date is invalid, show an error message or handle the error
                alert(`Please select a ${weekdaysString(days)} that is today or later.`);
            }
        }
        // setShow(false); // Close the date picker after interaction
    };

    const showDatepicker = () => {
        setDrawDate(new Date());
        setShow(true);
    };

    return (
        <>
        <View style={styles.container}>
            
            <View>
                {!show &&
                <Pressable style={styles.button} onPress={showDatepicker}>
                    <Text>Choose Date</Text>
                </Pressable>}
                <Text>{show ? 'press to change' : ''}</Text>
            </View>
            {show && (
                <DateTimePicker
                value={drawDate || new Date()}
                mode="date"
                display="default"
                onChange={onChange}
                />
            )}
        </View>
        </>
    )
}

export default DatePickerExpo;


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 10,
        margin: 10,
        borderRadius: 5
    }
});
