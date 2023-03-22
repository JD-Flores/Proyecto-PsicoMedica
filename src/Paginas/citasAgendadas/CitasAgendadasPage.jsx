import React from "react";
import { ProfileNav } from "../../Componentes/ProfileNav/ProfileNav";
import agenda from "../../imagenes/agenda.png";
import { CitaAgendada } from "../../Componentes/CitaAgendada/CitaAgendada";

export function CitasAgendadasPage() {
  return (
    <div id="container" className="h-full">
      <ProfileNav></ProfileNav>

      <div className="max-w-lg mx-auto m-8 bg-white p-10 rounded-xl shadow shadow-slate-300 w-[500px] h-fit">
        <div className="flex flex box space-x-4 ">
          <img
            src={agenda}
            className="w-14 h-14 mt-3"
            alt="agenda"
          />
          <h1 className="text-4xl text-gray-500 text-justify">
            Actualmente tiene N Citas Registradas
          </h1>
        </div>

        <div className='flex flex-row flex-wrap justify-evenly items-center '> 
          {citas?.map(() => (
            <CitaAgendada />
          )
          )}

          

        </div>

       
        </div>
      </div>
    
  );
}
