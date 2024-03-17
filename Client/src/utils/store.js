import { createContext } from "react";
export const token = window.localStorage.getItem("token");
export const chatListCont = createContext();

export const url = import.meta.env.VITE_REACT_APP_BASE_URL 
export const getTime = (timestamp) => {
    const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]
    var timeStr =""; 
    const sentDate = new Date(timestamp);
    if(sentDate.getFullYear() !== new Date(Date.now()).getFullYear()){
        timeStr += sentDate.getFullYear() + " ";
    }
    if(sentDate.getDate() !== new Date(Date.now()).getDate()){
        timeStr += sentDate.getDate();
        switch(sentDate.getDate()){
            case 1:
                timeStr+="st ";
                break;
            case 2:
                timeStr+="nd ";
                break;
            case 3:
                timeStr+="rd ";
                break;
            default:
                timeStr+="th ";
                break;
        }
        timeStr += months[sentDate.getMonth()] + " ";
    }
    const hrs = sentDate.getHours() > 12 ? sentDate.getHours() - 12 : sentDate.getHours();
    const phase = sentDate.getHours() >= 12 ? " PM" : " AM";
    const min = sentDate.getMinutes() >=10 ? sentDate.getMinutes().toString() : "0"+sentDate.getMinutes().toString();
    timeStr += (hrs.toString()+ ":" + min+phase);
    return timeStr;
}