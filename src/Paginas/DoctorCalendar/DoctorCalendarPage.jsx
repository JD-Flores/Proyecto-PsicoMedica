import React, { useState } from 'react'
import { Calendario } from '../../Componentes/Calendario/Calendario'
import { DoctorNav } from '../../Componentes/ProfileNav/DoctorNav'
import { useUser } from "../../contexts/UserContext";

export default function DoctorCalendarPage() {
  const {user}=useUser();
  const [uid, SetUid]=useState(user.uid);

  return (
    <div className=''>
    <DoctorNav></DoctorNav>
    <div className='xl:px-20 md:px-10 p-5'>
      <Calendario userid={uid} />
    </div>
    </div>
  )
}
