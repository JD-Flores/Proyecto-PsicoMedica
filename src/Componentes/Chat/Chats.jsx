import React from 'react'
import fotoPerfil from '../../imagenes/fotoPerfil.jpg'

export function Chats() {
  return (
    <div className=''>
        <div id='userchat' className='flex flex-row p-2 items-center gap-3 text-white hover:bg-green-900 w-full'>
            <img src={fotoPerfil} alt="" className='w-[24px] h-[24px] rounded-full'/>
            <div id='userinfo'>
            <span className='font-bold'>Gabo</span>
            <p className='text-xs text-gray-300'>mensaje</p>
            </div>
        </div>
    </div>
  )
}
