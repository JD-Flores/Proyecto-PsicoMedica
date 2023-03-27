import React, { useEffect, useState } from "react";
import { ProfileNav } from "../../Componentes/ProfileNav/ProfileNav";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CheckoutPage } from "../checkout/CheckoutPage";
import { useUser } from "../../contexts/UserContext";
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, Timestamp, updateDoc } from '@firebase/firestore'
import { db } from "../../firebase/config";
import { CHECKOUT } from "../../constantes/urls";
import { useParams } from "react-router-dom";
import { getDoctorById } from "../../firebase/users-service";
import { async } from "@firebase/util";
import { docContext,DoctorContext } from "../../contexts/DoctorContext";
import { reserveContext } from "../../contexts/ReserveContext";
import { useContext } from "react";


export function ReservarCitaPage() {
  const navigate = useNavigate();
  // const [reservation, setReservation] = useState([])
  const {user}=useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { doctor_id } = useParams();
  const [doctor, setDoctor] = useState([]);
  const [context, setContext] = useContext(docContext);
  const [reservationContext, setReservationContext] = useContext(reserveContext);
  const [duration, setDuration] = useState(null);
  const [start, setStart] = useState();
  const [day, setDay] = useState();
  const [datePassed, setDatePassed] = useState();
  const hora= watch("hora");
  const hora2= watch("hora2");
  const fecha= watch("fecha");

  

  

  const onSubmit = (data) => {
    if(hora>hora2){
      console.log("el valor de inicio no puede ser mayor al final");
      setStart(true);
      return "";
    }
    const dia = new Date().getDate();
    let month = new Date().getMonth()+1;
    if(month[1]==null){
      month= `0${month}`;
    }
    const year = new Date().getFullYear();
    const currentDate = `${year}-${month}-${dia}`;
    console.log(currentDate);
    console.log(fecha);
    if(fecha==currentDate){
      setDay(true);
      return "";
    }

    const dateArray = fecha.split("-");
    if (dateArray[0]<year) {
      setDatePassed(true);
      console.log("prueba año " + dateArray[0]);
      return "";
    }
    else{
      if (dateArray[1]<month) {
        setDatePassed(true);
        console.log("prueba mes " + dateArray[1]);
        return "";
      }
      else{
        if (dateArray[2]<dia && dateArray[1]==month ) {
          setDatePassed(true);
          console.log("prueba dia " + dateArray[2]);
          return "";
        }
      }
    }
  
    if(parseInt(hora2)-parseInt(hora)>2){
      setDuration(true);
      return "";
    }


    console.log(dia);
    console.log(month);
    console.log(year);

    console.log(context)
    setReservationContext({
      title: user.name +"  "+data.motivoCita,
      start:data.fecha +" "+ data.hora,
      end:data.fecha +" "+ data.hora2,
    }
    )
    navigate(`/checkout/${context.uid}`);
    
  }

  

  const patterns = {
    startTime: "8:00 AM",
  }

  const messages = {
    startMessage: "La hora seleccionada ya se encuentra reservada",
  }

  return (
    <div
      id="container"
      className="h-full"
    >
      <ProfileNav></ProfileNav>

      <div className="max-w-lg mx-auto m-8 bg-white p-10 rounded-xl shadow shadow-slate-300 w-[500px] h-fit">
        <div>
          <h1 className="text-4xl text-gray-500 text-justify p-1">
            Reservar Cita
          </h1>
        </div>

        <div className="max-w-lg mx-auto m-4 text-center">
          <div className="selectDoctor">
            <h2 className="text-xl text-black font-bold   mb-1">
              Doctor seleccionado: 
            </h2>
          </div>
        

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Input fecha */}
          <label htmlFor="fecha" className="block cursor-pointer">
            <div className="py-1 mt-1">
              <h2 className="text-xl text-black font-bold  mb-1">Fecha:</h2>

              <input
                className="w-[300px] p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                id="fecha"
                type="date"
                {...register("fecha", {
                  required: true,
                })}
              />
              {errors.fecha?.type === "required" && 
                (<p className="text-red-600">El campo es requerido</p>)
            }
            {day==true ? <p className="text-red-600">La cita no puede ser agendada el mismo día</p>: ""}
            {datePassed==true ? <p className="text-red-600">La cita no puede ser agendada en una fecha previa a hoy</p>: ""}
            </div>
          </label>

          {/* Input hora */}

          <label htmlFor="hora" className="block cursor-pointer">
            <div className="py-1 mt-1">
              <h2 className="text-xl text-black font-bold  mb-1">Hora Inicio:</h2>

              <select
              id="hora" placeholder="Indique una hora"
                className="w-[300px] p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                type="time"
                {...register("hora", {
                  required: true,
                })}
              >
                  <option value=""></option>
                  <option value="08:00:00">8:00 AM</option>
                  <option value="09:00:00">9:00 AM</option>
                  <option value="10:00:00">10:00 AM</option>
                  <option value="11:00:00">11:00 AM</option>
                  <option value="12:00:00">12:00 AM</option>
                  <option value="13:00:00">1:00 PM</option>
                  <option value="14:00:00">2:00 PM</option>
                  <option value="15:00:00">3:00 PM</option>
                  <option value="16:00:00">4:00 PM</option>
                  <option value="17:00:00">5:00 PM</option>
                  <option value="18:00:00">6:00 PM</option>
                  <option value="19:00:00">7:00 PM</option>
                  <option value="20:00:00">8:00 PM</option>
              </select>
              {errors.hora?.type === "required" && <p className="text-red-600">El campo es requerido</p>}
              {start==true ? <p className="text-red-600">El tiempo de inicio no puede ser mayor al final</p>: ""}
              
            </div>
          </label>

          {/* Input duración */}

          <label htmlFor="hora2" className="block cursor-pointer">
            <div className="py-1 mt-1">
              <h2 className="text-xl text-black font-bold  mb-1">Hora Fin:</h2>

              <select
              id="hora2"
                className="w-[300px] p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                type="time"
                {...register("hora2", {
                  required: true,
                })}
              >
                  <option value=""></option>
                  <option value="08:00:00">8:00 AM</option>
                  <option value="09:00:00">9:00 AM</option>
                  <option value="10:00:00">10:00 AM</option>
                  <option value="11:00:00">11:00 AM</option>
                  <option value="12:00:00">12:00 AM</option>
                  <option value="13:00:00">1:00 PM</option>
                  <option value="14:00:00">2:00 PM</option>
                  <option value="15:00:00">3:00 PM</option>
                  <option value="16:00:00">4:00 PM</option>
                  <option value="17:00:00">5:00 PM</option>
                  <option value="18:00:00">6:00 PM</option>
                  <option value="19:00:00">7:00 PM</option>
                  <option value="20:00:00">8:00 PM</option>
              </select>
              {errors.hora2?.type === "required" && <p className="text-red-600">El campo es requerido</p>}
              {duration==true ? <p className="text-red-600">La duración de la cita no puede ser mayor a 2 horas</p>: ""}
              
            </div>
          </label>

          {/* Input motivo */}

          <label htmlFor="motivoCita" className="block cursor-pointer">
            <div className="py-1 mt-1">
              <h2 className="text-xl text-black font-bold  mb-1">Motivo:</h2>
              <textarea
              id="motivoCita"
                className="w-[300px] h-[170px] p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm resize-none"
                type="text"
                placeholder="Motivo de la cita [máx. 200 caracteres]"
                {...register("motivoCita", {
                  required: true,
                  minLength: 10,
                  maxLength: 200,
                })}
              />
              {errors.motivoCita?.type === "required" && (
                <p className="text-red-600">El campo es requerido</p>
              )}
              {errors.motivoCita?.type === "minLength" && (
                <p className="text-red-600">El motivo debe tener minimo 10 caracteres</p>
              )}
              {errors.motivoCita?.type === "maxLength" && (
                <p className="text-red-600">El motivo debe tener máximo 200 caracteres</p>
              )}
            </div>
          </label>

          {/* Enviar form */}

          <div className="flex flex-row items-center justify-evenly m-5">

          
          <input 
          className=" cursor-pointer flex items-center justify-center bg-black text-white p-1 rounded-md h-10 w-[180px] text-center text-sm font-medium" type="submit" value="Confirmar cita" />
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}