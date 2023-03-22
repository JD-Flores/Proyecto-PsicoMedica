
import React, { useState } from "react";
import { Calendario } from "../../Componentes/Calendario/Calendario";
import { DoctorNav } from "../../Componentes/ProfileNav/DoctorNav";


export function PerfilDoctorPage() {

 
  return (
    <div>
      <div id='container' className=' flex justify-center w-screen h-full flex-col'>
      <DoctorNav></DoctorNav>
      </div>
    </div>
  )
}
