import Calendar from "react-calendar";

function DayPicker ({ selectedDay, onChange}) {
    return (
        <div className="mt-6">
            <Calendar
            onChange={onChange}
            selectedDay={selectedDay}
            prev2Label={null}
            next2Label={null}
            minDetail="month"
            minDate={new Date()}
            formatShortWeekday={(locale, value)=>
                ["S", "M", "T", "W", "T", "F", "S"][value.getDay()]
            }
            showWeekNumbers={true}
            onClickWeekNumber={(e, value) => {
                console.log("I should select an entire week");
            }}
            />
        </div>
    );
}

export default DayPicker;