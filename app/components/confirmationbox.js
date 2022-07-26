import dayjs from "dayjs";
import BookingForm from "./bookingform";
import { formatAddr } from '../utils'

function ConfirmationBox({ selectedDay, selectedTime, id }) {
    return (
        <>
        {selectedTime && (
            <div>
                <div className="details__box !mb-6">
                    {" "}
                    <div className="details__title">Confirm Event Details</div>
                        <div className="font-normal mb-2">
                            30 Minutes Meetings
                            <br/>
                            {dayjs(selectedDay).format("dddd")},{"  "}
                            {dayjs(selectedDay).format("MMMM")}{"  "}
                            {dayjs(selectedDay).format("D")} @{"  "}
                            {dayjs(selectedTime).format("H")}:
                            {dayjs(selectedTime).format("mm")} EST
                            <br/>
                            with
                            <br/>
                            {formatAddr(id)}
                        </div>
                </div>
                <BookingForm
                selectedDay={selectedDay}
                selectedTime={selectedTime}
                acptUser={id}
          />
            
            </div>
        )}
        </>
    )
}

export default ConfirmationBox;