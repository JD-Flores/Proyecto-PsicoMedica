import React, { useState } from 'react'
import { Calendario } from '../../Componentes/Calendario/Calendario'
import { DoctorNav } from '../../Componentes/ProfileNav/DoctorNav'
import { useUser } from "../../contexts/UserContext";

export default function DoctorCalendarPage() {
  const {user}=useUser();
  const [uid, SetUid]=useState(user.uid);

  return (
    <div>
    <DoctorNav></DoctorNav>
    <Calendario userid={uid} />
    </div>
  )
}
