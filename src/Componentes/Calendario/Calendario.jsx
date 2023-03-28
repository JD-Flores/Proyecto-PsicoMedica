import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enUS from "date-fns/locale/en-US";
import { setDate } from "date-fns";
import { doc, getDoc, onSnapshot } from "@firebase/firestore";
import { db } from "../../firebase/config";
import { useUser } from "../../contexts/UserContext";
import { date } from "date-arithmetic";



export function Calendario({userid}) {
  const [dates,setDates]=useState([]);
  const [reserva,setReserva]=useState([]);

  function useDates(){
    
  }
  
  useEffect(() => {  

    const events = dates?.map((element) =>{
        const temp = element.info.end
        element.end = new Date(temp)
        const temp2 = element.info.start
        element.start = new Date(temp2)
        element.title = element.info.title
        setReserva(dates)
    }) 
    
   },[dates]);

  useEffect(() => {  
     onSnapshot(doc(db,"calendarios",userid),(doc)=>{
      doc.exists()&& setDates(doc.data().citas)
    })
    
   },[]);

//    const handle=()=>{
//     console.log(dates)
//    }
//    const handleClick= async ()=>{
//     onSnapshot(doc(db,"calendarios",user.uid),(doc)=>{
//       doc.exists()&& setDates(doc.data().citas)
//     })
//     const events = dates?.map((element) =>{
//         const temp = element.info.end
//         element.end = new Date(temp)
//         const temp2 = element.info.start
//         element.start = new Date(temp2)
//         setDates(dates)
//         console.log(dates)
//     })

    
// };
   
  

    const locales = enUS
  const localizer = dateFnsLocalizer({
      format,
      parse,
      startOfWeek,
      getDay,
      locales,
  });
  

    return (
      <div  className="bigCalendar-container bg-blue-300 text-white h-[400px]">
      <Calendar
        localizer={localizer}
        events={reserva}
        startAccessor="start"
        endAccessor="end"
        messages={{
          next: "sig",
          previous: "ant",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día"
        }}
      />
    </div>
    )
  }
  