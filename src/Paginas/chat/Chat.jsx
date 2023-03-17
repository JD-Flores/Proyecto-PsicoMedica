import React from 'react'
import { Messages } from '../../Componentes/Chat/Messages'
import { Sidebar } from '../../Componentes/Chat/Sidebar'
import { ProfileNav } from '../../Componentes/ProfileNav/ProfileNav'

export function Chat() {
  return (
    <div id='container' 
    className=' flex justify-center w-screen h-full flex-col'>
     <ProfileNav></ProfileNav>
      <div id='secondHalf' className='p-4 flex w-full  items-center'>
        <div className='flex flex-col w-full h-screen mx-auto bg-white rounded-xl shadow shadow-slate-300 overflow-hidden '>
            <div className='flex flex-row h-full'>
            <Sidebar></Sidebar>
            <Messages></Messages>
            </div>
            
        </div>
        </div>
      </div>
  )
}
