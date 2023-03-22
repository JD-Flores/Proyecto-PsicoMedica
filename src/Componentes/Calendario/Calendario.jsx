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



export function Calendario() {
  const [dates,setDates]=useState([]);
  const [reserva,setReserva]=useState([])
  const {user}=useUser();

  function useDates(){
    
  }
  
  useEffect(() => {  

    const events = dates.map((element) =>{
        const temp = element.end
        element.end = new Date(temp)
        const temp2 = element.start
        element.start = new Date(temp2)
        setReserva(dates)
    }) 
    
   },[dates]);

   useEffect(() => {  
     onSnapshot(doc(db,"calendarios",user.uid),(doc)=>{
      doc.exists()&& setDates(doc.data().citas)
    })

    
   },[]);

   const handle=()=>{
    console.log(dates)
   }
   const handleClick= async ()=>{
    onSnapshot(doc(db,"calendarios",user.uid),(doc)=>{
      doc.exists()&& setDates(doc.data().citas)
    })
    const events = dates.map((element) =>{
        const temp = element.end
        element.end = new Date(temp)
        const temp2 = element.start
        element.start = new Date(temp2)
        setDates(dates)
        console.log(dates)
    })

    
};
   
  

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
        <button onClick={handle}> aqui</button>
        <button onClick={handle}>aui2</button>
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
  