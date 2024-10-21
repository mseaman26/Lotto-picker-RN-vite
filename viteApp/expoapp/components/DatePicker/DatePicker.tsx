
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './datePicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

interface DatePickerProps {
    drawDate: Date | null;
    setDrawDate: any;
    days: number[];
}


const DatePickerVite = ({setDrawDate, drawDate, days}: DatePickerProps) => {

    const dayFilter = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        return days.includes(date.getDay()) && date >= today; // 6 represents Saturday
    };

    return (
        <div style={styles.container}>
            <DatePicker selected={drawDate? drawDate: null} onChange={(date) => setDrawDate(date as Date)} filterDate={dayFilter}/>
        </div>
    );
};

export default DatePickerVite;

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
        cursor: 'pointer'
    },
}