import React from "react";
import { ProfileNav } from "../../Componentes/ProfileNav/ProfileNav";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CheckoutPage } from "../checkout/CheckoutPage";

export function ReservarCitaPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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
            <p className="text-base">Nombre doctor</p>
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
            </div>
          </label>

          {/* Input hora */}

          <label htmlFor="hora" className="block cursor-pointer">
            <div className="py-1 mt-1">
              <h2 className="text-xl text-black font-bold  mb-1">Hora:</h2>

              <input
              id="hora"
                className="w-[300px] p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                type="time"
                {...register("hora", {
                  required: true,
                })}
              />
              {errors.hora?.type === "required" && <p className="text-red-600">El campo es requerido</p>}
            </div>
          </label>

          {/* Input duración */}

          <label htmlFor="duracionCita" className="block cursor-pointer">
            <div className="py-1 mt-1">
              <h2 className="text-xl text-black font-bold  mb-1">Duración:</h2>

              <input
              id="duracionCita"
                className="w-[300px] p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                type="number"
                placeholder="[minutos]"
                {...register("duracionCita", {
                  required: true,
                  min: 10,
                  max: 120,
                })}
              />
              {errors.duracionCita?.type === "required" && (
                <p className="text-red-600">El campo es requerido</p>
              )}
              {errors.duracionCita?.type === "min" && (
                <p className="text-red-600">La cita debe tener una duración mínima de 10 minutos</p>
              )}
              {errors.duracionCita?.type === "max" && (
                <p className="text-red-600">
                  La cita debe tener una duración máxima de 120 minutos (2
                  horas)
                </p>
              )}
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

          
          <input className="flex items-center justify-center bg-black text-white p-1 rounded-md h-10 w-[180px] text-center text-sm font-medium" type="submit" value="Confirmar cita" />
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}