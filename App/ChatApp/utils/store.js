import { createContext } from "react";

export const navContext = createContext(); 
export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0AxMjQuY29tIiwiaWQiOiI2NTk3Yjg3OTY0NzQ2M2U3NmI1MGVkZWIiLCJpYXQiOjE3MDU0MzIyMTMsImV4cCI6MTcwNTY5MTQxM30.txN4RPuWVFBPue3-wfKSmS-LVvcZzcLYU6FLz1ndR0U"
export const chatListCont = createContext();
const clg = "10.100.39.255";
const flat = "192.168.1.12";
const ghar = "192.168.29.165";
export const url = `http://${flat}:3002/`

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