import React from 'react'
import { Messages } from '../../Componentes/Chat/Messages'
import { Sidebar } from '../../Componentes/Chat/Sidebar'
import { DoctorNav } from '../../Componentes/ProfileNav/DoctorNav'
import { ProfileNav } from '../../Componentes/ProfileNav/ProfileNav'
import { useUser } from '../../contexts/UserContext'

export function Chat() {
  const {user}=useUser()
  return (
    <div id='container' 
    className=' flex justify-center h-full flex-col'>
      {user.doctor==true&&
      <DoctorNav></DoctorNav>}
      {user.doctor==false&&
      <ProfileNav></ProfileNav>
      }
      <div id='secondHalf' className='p-6 flex w-full  items-center'>
        <div className='flex flex-col w-full h-screen mx-auto rounded-xl shadow shadow-slate-300 overflow-hidden '>
            <div className='flex flex-row h-full'>
            <Sidebar></Sidebar>
            <Messages></Messages>
            </div>
            
        </div>
        </div>
      </div>
  )
}
