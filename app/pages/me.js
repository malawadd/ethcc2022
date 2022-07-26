import { useState, useEffect } from "react";
import { useMoralisQuery, useMoralis } from "react-moralis";
import Nav from "../components/nav";
import { ethers } from "ethers";
import { bookingAddress } from '../bookingAddress.js'
import booking from "../abi/Booking.json";
import dayjs from "dayjs";
import { formatAddr } from '../utils'
import { TimeSlot } from "../components/timepicker";

function Me() {
  const { data } = useMoralisQuery("UserSchedule");
  const { isAuthenticated, user } = useMoralis();
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [valid, setValid] = useState("");

  const release = async (selectedTime, bookerAddress) => {
    console.log("releasing");
    const { ethereum } = window;
    if (!ethereum) {
      console.warn("No Wallet, we need to do something about this");
      return;
    }
    const durationSec = 30*60;
    const endtime = dayjs(selectedTime).unix() + durationSec;
    console.log(bookerAddress);
    console.log(endtime);
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const bookingContract = new ethers.Contract(bookingAddress, booking.abi, signer);
    const bookTx = await bookingContract.burn("0x000000000000000000000000000000000000dEaD", bookerAddress, ethers.BigNumber.from(endtime));
    await bookTx.wait();
  };

    useEffect(() => {
        if(user){
            setValid(user.get("ethAddress"));
            console.log("hey mom");
        }
    },[user]);

    const upcomingMEetings = data
    .filter((d) => d.get("status") === "PENDING")
    .filter((d) => d.get("acceptingUser") === valid)
    .filter((d) => dayjs().isBefore(d.get("meetingTime")))
    .sort(
      (a, b) =>
        Date.parse(a.get("meetingTime")) - Date.parse(b.get("meetingTime"))
    );

    const prevMeetings = data
    .filter((d) => d.get("acceptingUser") === valid)
    .filter((d) => dayjs().isAfter(d.get("meetingTime")));

  return (
    <>
    <Nav/>
    {console.log(valid)}
    {isAuthenticated ?(
        <div className={`flex flex-col items-center justify-center mt-20 py-2 ${!isAuthenticated && "hidden"}`}>
              <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                hi
              <div className="flex justify-evenly w-full">
                <div className="flex flex-col">
                Previous Meetings
                {prevMeetings.map((d, idx) => (
                   <TimeSlot key={idx} onClick={() => setSelectedMeeting(d)}>
                        {dayjs(d.get("meetingTime")).format("MMM DD, YYYY")}
                        {" with "}
                        {d.get("name") || d.get("requestingUser").get("ethAddress")}
          
                    </TimeSlot>
                ))}
                </div>
                <div className="flex flex-col justify-between">
                    My Upcoming Meetings
                    {upcomingMEetings.map((d, idx) => (
                        <TimeSlot key={idx} onClick={() => setSelectedMeeting(d)}>
                            {dayjs(d.get("meetingTime")).format("MMM DD @ hh:mm a")}
                            {" with "}
                            {d.get("name") || formatAddr(d.get("requestingUser").get("ethAddress"))}
                        </TimeSlot>
                    ))}
                </div>
                <div className="flex flex-col details__box !h-full !pb-4 !mt-7">
                    {selectedMeeting ?(
                        <>
                        <div>
                            <div>
                                Name:{""}
                                {selectedMeeting.get("name") || "No name available"}
                            </div>

                            <div>
                                Notes: {selectedMeeting.get("notes")}
                            </div>
                            <div>
                                Fee: 0.003 ETH
                            </div>
                            <div>
                                Duration: {selectedMeeting.get("duration")} mins
                            </div>
                            <div className="grow"></div>
                        </div>
                        <div>
                            {!dayjs().isBefore(
                                selectedMeeting.get("meetingTime")
                            ) && (
                                <div className="flex flex-col pt-8">
                                    <button className="bg-[#B4AAD0] text-white font-bold hover:bg-[#d1b9dc] transition-colors " onClick={() => release(selectedMeeting.get("meetingTime"), selectedMeeting.get("requestingUser").get("ethAddress"))}>
                                        return
                                    </button>
                                    or
                                    <button className="bg-[#B4AAD0] text-white font-bold hover:bg-[#d1b9dc] transition-colors" onClick={() => burn(selectedMeeting.get("meetingTime"), selectedMeeting.get("requestingUser").get("ethAddress"))}>
                                        burn
                                    </button>
                                </div>
                            )}
                        </div>
                        </>

                    ) :(
                    <div>Please select a meeting to view details</div>
                    
                    )}
                </div>

              </div>
              </main>
        </div>
    ) :(
        <div className="login__shadow absolute bottom-1/2 text-3xl text-white font-bold bg-[#222] w-full text-center">
            Please login
        </div>
    )};

    
    </>
  );
}

export default Me;
