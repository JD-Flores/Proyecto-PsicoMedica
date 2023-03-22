import React from 'react'
import { Calendario } from '../../Componentes/Calendario/Calendario'
import { DoctorNav } from '../../Componentes/ProfileNav/DoctorNav'

export default function DoctorCalendarPage() {
  return (
    <div>
    <DoctorNav></DoctorNav>
    <Calendario/>
    </div>
  )
}
