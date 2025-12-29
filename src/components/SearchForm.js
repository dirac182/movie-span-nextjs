'use client'
import { useEffect, useState } from "react";
import useFormStore from "../store/form-data.js";

export default function SearchForm() {
    const {clockHr, clockMin, isPm, atTheater, setClockHr, setClockMin, setIsPm, setAtTheater, isTwelveHr, setIsTwelveHr} = useFormStore();
    const now = new Date();
    const userTimeHr = now.getHours();
    const userTimeMin = now.getMinutes();

    useEffect(() => {
        console.log(userTimeHr)
        console.log(userTimeMin)
        setClockHr(userTimeHr)
        setClockMin(userTimeMin)
        const roundedMinutes = (Math.ceil(userTimeMin / 5) * 5).toString().padStart(2, '0');
        if (roundedMinutes == 60){
            setClockMin("00")
            setClockHr(clockHr+1)
        }else{
            setClockMin(roundedMinutes);
        }
        if(userTimeHr === 0 && isTwelveHr){
            setClockHr(12)
            setIsPm(false)
        }
        if (userTimeHr <= 11 && isTwelveHr){
            setIsPm(false)
        }
        if (userTimeHr >= 13 && isTwelveHr){
            setClockHr(userTimeHr - 12)
        }
    }, [isTwelveHr])

    const handleAddHour12 = () => {
        const newTime = new Date(`01/01/2001 ${parseInt(clockHr+1)}:${parseInt(clockMin)}:00`)
        if(parseInt(newTime.getHours()) > 12){
            setClockHr(newTime.getHours() -12)
        }else{
            setClockHr(newTime.getHours())
        }
    }
    const handleSubtractHour12 = () => {
        const newTime = new Date(`01/01/2001 ${parseInt(clockHr-1)}:${parseInt(clockMin)}:00`)
        if(parseInt(newTime.getHours()) > 12){
                console.log("Invalid Hour")
                setClockHr(newTime.getHours() -12)
        }else if (newTime.getHours() == 0){
                setClockHr(12)
        }else{
                setClockHr(newTime.getHours())
            }
    }
    const handleAddHour24 = () => {
        const newTime = new Date(`01/01/2001 ${parseInt(clockHr)}:${parseInt(clockMin)}:00`)
        console.log(newTime)
        if(parseInt(newTime.getHours() - 1) > 23){
            setClockHr(0)
        }else{
            setClockHr(newTime.getHours() + 1)
        } 
    }
    const handleSubtractHour24 = () => {
        const newTime = new Date(`01/01/2001 ${parseInt(clockHr-1)}:${parseInt(clockMin)}:00`)
        if(parseInt(newTime.getHours()) > 23){
                console.log("Invalid Hour")
                setClockHr(0)
        }else if (newTime.getHours() == 0){
                setClockHr(23)
        }else{
                setClockHr(newTime.getHours())
            }
        }
    

    const handleAddMin = () => {
        if ((parseInt(clockMin) +5) > 59){
            const newTime = new Date(`01/01/2001 ${parseInt(clockHr)}:${0}:00`)
            setClockMin(newTime.toString().slice(19,21))
        }else{
            const newTime = new Date(`01/01/2001 ${parseInt(clockHr)}:${parseInt(clockMin)+5}:00`)
            setClockMin(newTime.toString().slice(19,21))
        }
    }
    const handleSubtractMin = () => {
        if ((parseInt(clockMin) -5) < 0){
            const newTime = new Date(`01/01/2001 ${parseInt(clockHr)}:${55}:00`)
            setClockMin(newTime.toString().slice(19,21))
        }else{
            const newTime = new Date(`01/01/2001 ${parseInt(clockHr)}:${parseInt(clockMin)-5}:00`)
            setClockMin(newTime.toString().slice(19,21))
        }
    }

    return (
        <div className="pt-5 px-5">    
        <div className="text-white">
            <p className="text-center font-bold text-xl">Where are you watching?</p>
            <div className="flex justify-center">
                <button onClick={() => setAtTheater(true)} className={`bg-gray-700 m-3 p-3 border-solid border-2 rounded-lg border-orange-500 bg-gray-700 ${atTheater ? "bg-orange-500" : ""}`}>In Theaters</button>
                <button onClick={() => setAtTheater(false)} className={`bg-gray-700 m-3 p-3 border-solid border-2 rounded-lg border-orange-500 bg-gray-700 ${atTheater ? "" : "bg-orange-500" }`}>At Home</button>
            </div>
            {atTheater ? <p className="text-center text-sm">*Approximate time for ads and trailers will be accounted for.</p> : <span></span>}
        </div>
        <div className="text-white py-3">
            <p className="text-center font-bold text-xl">What time does it start?</p>
            <div className="flex justify-center pt-2">
                    <div className={`text-lg text bg-gray-700 border-2 border-r-0 border-solid rounded-l-lg border-orange-500 hover:bg-orange-500 ${isTwelveHr ? "bg-orange-500" : ""} flex items-start justify-center p-1`}>
                        <button onClick={() => setIsTwelveHr(true)} className="pt-1">12hr</button>
                    </div>
                    <div className={`text-lg text bg-gray-700 border-2 border-l-0 border-solid rounded-r-lg border-orange-500 hover:bg-orange-500 ${isTwelveHr ? "" : "bg-orange-500"} flex items-start justify-center p-1`}>
                        <button onClick={() => setIsTwelveHr(false)} className="pt-1">24hr </button>
                    </div>
                </div>
            <div className="flex justify-center items-center p-4">
                <div className="flex flex-col">
                    <div onClick={isTwelveHr ? handleAddHour12 : handleAddHour24} className="text-3xl text bg-gray-700 border-2 border-b-0 border-solid rounded-t-lg border-orange-500 h-7 hover:bg-orange-500 flex items-start justify-center pt-1 px-4">
                        <button className="relative bottom-2 ">+</button>
                    </div>
                    <input onChange={(event) => setClockHr(event.target.value)} className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-3xl bg-sky-950 border-solid border-r-2 border-l-2 text-center border-orange-500 w-14 h-14" value={clockHr} type="number" />
                    <div onClick={isTwelveHr ? handleSubtractHour12 : handleSubtractHour24} className="text-4xl text bg-gray-700 border-2 border-t-0 border-solid rounded-b-lg border-orange-500 h-7 hover:bg-orange-500 flex items-start justify-center pt-1 px-4">
                        <button className="relative bottom-3 ">-</button>
                    </div>                        
                </div>
                <label className="px-2 text-5xl">:</label>
                <div className="flex flex-col">
                    <div onClick={handleAddMin} className="text-3xl text bg-gray-700 border-2 border-b-0 border-solid rounded-t-lg border-orange-500 h-7 hover:bg-orange-500 flex items-start justify-center pt-1 px-4">
                        <button className="relative bottom-2 ">+</button>
                    </div>
                    <input onChange={(event) => setClockMin(event.target.value)} className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-3xl bg-sky-950 border-solid border-r-2 border-l-2 text-center border-orange-500 w-14 h-14" value={clockMin} type="number" max="59" min="00" />
                    <div onClick={handleSubtractMin} className="text-4xl text bg-gray-700 border-2 border-t-0 border-solid rounded-b-lg border-orange-500 h-7 hover:bg-orange-500 flex items-start justify-center pt-1 px-4">
                        <button className="relative bottom-3 ">-</button>
                    </div>                        
                </div>
                <div className={`flex flex-col pl-5 ${isTwelveHr ? "" : "hidden"}`}>
                    <div onClick={() => setIsPm(false)} className={`px-2 text-lg text bg-gray-700 border-2 border-b-2 border-solid rounded-t-lg border-orange-500 flex items-start justify-center pt-1 ${isPm ? "" : "bg-orange-500"}`}>
                        <button className="p-2">AM</button>
                    </div>
                    <div onClick={() => setIsPm(true)} className={`px-2 text-lg text bg-gray-700 border-2 border-b-2 border-solid rounded-b-lg border-orange-500 flex items-start justify-center pt-1 ${isPm ? "bg-orange-500" : ""}`}>
                        <button className="p-2">PM</button>
                    </div>                        
                </div>
            </div>
        </div>
    </div>
    )
}