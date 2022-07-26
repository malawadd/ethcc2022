import { useState, useEffect } from "react";
import Head from "next/head";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import DayPicker from "../components/daypicker";
import TimePicker from "../components/timepicker";
import ConfirmationBox from "../components/confirmationbox";
 

function Booking(){
    const [selectedDay, onChange] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [validURL, setValidURL] = useState(true);
    const router = useRouter();
    const {
        isReady,
        query:{ id },
    } = router;

    useEffect(() => {
        if(!isReady){
            console.log("Router not ready");
            return;
        }
        console.log(`ID: ${id}`);
        if(!id.includes("0x")){
            setValidURL(false);
        }
    }, [isReady]);

    return (
        <>

        {
            validURL ? (
                <div className="flex flex-col items-center justify-center py-2">
                    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                    <div className="text-3xl py-6 font-bold underline decoration-8 decoration-[#B4AAD0]">
                        {`Book a meeting with ${(id)}` || "Loading"}
                        </div>
                        <div className="flex justify-evenly w-full">
                            <div className="flex flex-col justify-between">
                                <DayPicker selectedDay={selectedDay} onChange={onChange}/>
                                <ConfirmationBox
                                    id={id}
                                    selectedDay={selectedDay}
                                    selectedTime={selectedTime}
                                />
                            </div>
                            <TimePicker
                                selectedDay={selectedDay}
                                selectedTime={selectedTime}
                                setSelectedTime={setSelectedTime}
                                acceptingUser={id}
                            />
                        </div>
                    </main>
                </div>
            ) :(
                <div className="w-full min-h-screen bg-[#222]">
                    <div className="login__shadow absolute bottom-1/2 text-3xl text-white font-bold w-full text-center">
                        invalid url
                    </div>
                </div>
            )
        }
        </>
    )

}
export default Booking;