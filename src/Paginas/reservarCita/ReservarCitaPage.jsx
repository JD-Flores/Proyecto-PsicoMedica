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

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div id="container" className="h-[1000px]">
        <ProfileNav></ProfileNav>

        <div className="max-w-lg mx-auto m-8 bg-white p-10 rounded-xl shadow shadow-slate-300 h-[800px]">
          <div>
            <h1 className="text-4xl text-gray-500 text-justify p-2">
              Reservar Cita
            </h1>

            <div className="max-w-lg mx-auto m-8 text-center">
              <div className="selectDoctor">
                <h2 className="text-xl text-black font-bold   mb-1">
                  Doctor seleccionado:
                </h2>
                <p className="text-base">Nombre doctor</p>
              </div>

              {/* Input fecha */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="date" className="block cursor-pointer">
                  <div className="py-1 mt-2">
                    <h2 className="text-xl text-black font-bold  mb-1">
                      Fecha:
                    </h2>

                    <input
                      className="w-[270px] p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                      id="date"
                      type="date"
                    />
                  </div>
                </label>

                {/* Input Hora */}
                <label htmlFor="time" className="block cursor-pointer">
                  <div className="py-1 mt-2">
                    <h2 className="text-xl text-black font-bold  mb-1">
                      Hora:
                    </h2>
                    <div>
                      <input
                        className="w-[270px] p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                        type="time"
                        id="time"
                        name="date"
                      />
                    </div>
                  </div>
                </label>

                {/* Input Duración */}
                <label htmlFor="duration" className="block cursor-pointer">
                  <div className="py-1 mt-2">
                    <h2 className="text-xl text-black font-bold  mb-1">
                      Duración:
                    </h2>
                    <div>
                      <input
                        id="duration"
                        name="duration"
                        className="w-[270px] p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                        type="number"
                        placeholder="Minutos"
                        {...register("duration", {
                          required: true,
                          min: 10,
                          max: 120,
                          message:
                            "La duración de la cita debe ser entre 10 a 120 minutos",
                        })}
                      />
                      {errors.duration && <span>{errors.duration}</span>}
                    </div>
                  </div>
                </label>

                {/* Input Motivo */}
                <label htmlFor="motive" className="block cursor-pointer">
                  <div className="py-1 mt-2">
                    <h2 className="text-xl text-black font-bold  mb-1">
                      Motivo:
                    </h2>
                    <div>
                      <textarea
                        maxLength="200"
                        id="motive"
                        name="motive"
                        className="w-[270px] h-[170px] p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm resize-none"
                        type="text"
                        placeholder="Motivo de la consulta (200 caracteres)"
                      ></textarea>
                    </div>
                  </div>
                </label>
              </form>

              <div className="flex flex-row items-center justify-evenly  text-xs m-5">
                <Link to={CheckoutPage}>
                  <button className="flex items-center justify-center bg-black text-white p-1 rounded-md h-10 w-[180px] text-center text-sm font-medium" type="submit">
                    <span>Confirmar Cita </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
