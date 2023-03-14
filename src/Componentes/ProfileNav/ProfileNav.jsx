import React from 'react'
import { useUser } from '../../contexts/UserContext'
import { Link } from 'react-router-dom';
import { BUSCAR_DOC, CHAT, PERFIL_CLIENTE, RESERVAR_CITA } from '../../constantes/urls';

export function ProfileNav() {
    const{user}=useUser();
  return (
    <div id='firstHalf' className=' flex p-4 w-full items-center'>
        <div className='flex flex-col w-full  bg-white p-2 rounded-xl shadow shadow-slate-300 '> 
          <div id='top' className='flex items-center justify-center h-full'>
            <h1 className='flex items-center justify-center text-center text-xl  mb-2'>Bienvenido {user.name}</h1>
          </div>
          <div id='bottom' className='flex flex-row items-center justify-evenly  text-xs mb-2'>
            <Link to={PERFIL_CLIENTE} className='flex items-center justify-center bg-black text-white p-1 rounded-md h-10 w-1/5 text-center'>Perfil</Link>
            <Link to={BUSCAR_DOC} className='flex items-center justify-center bg-black text-white p-1 rounded-md h-10 w-1/5 text-center'>Buscar Doctor</Link>
            <Link to={RESERVAR_CITA} className='flex items-center justify-center bg-black text-white p-1 rounded-md h-10 w-1/5 text-center'>Reservar Cita</Link>
            <Link to={CHAT} className='flex items-center justify-center bg-black text-white p-1 rounded-md h-10 w-1/5 text-center'>Chats</Link>
          </div>
        </div>
      </div>
  )
}
