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


export function Calendario() {
  const [dates,setDates]=useState();


  useEffect(() => {   

   });

   const handleClick= async ()=>{
    const unSub = onSnapshot(doc(db,"calendarios","LvHwpji3tQZlcmQQDDoNx1qkqTs2"),(doc)=>{
      doc.exists()&& setDates(doc.data().citas)
      console.log(dates)
    })
   
  }

    const locales = enUS
  const localizer = dateFnsLocalizer({
      format,
      parse,
      startOfWeek,
      getDay,
      locales,
  });
  
    //array de eventos
  const myEventsList= [{
    title: "today",
    start: new Date('2023-03-03 08:22:00'),
    end: new Date('2023-03-03 10:42:00')
  },
  {
    title: "string",
     start: new Date('2019-05-05 12:22:00'),
    end: new Date('2019-05-05 13:42:00')
  }]
    
    return (
      <div  className="bigCalendar-container bg-blue-300 text-white h-[400px]">
        <button onClick={handleClick}> aqui</button>
      <Calendar
        localizer={localizer}
        events={dates}
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
  