import React from 'react'
import fotoPerfil from '../../imagenes/fotoPerfil.jpg'


export function Search() {
  return (
    <div className='w-full'>
        <div>
            <input type="text" name="" id="" placeholder='Search'
            className='p-2 bg-transparent text-white border-none outline-none placeholder-gray-300 w-full' />
        </div>
        <div id='userchat' className='flex flex-row p-2 items-center gap-3 text-white hover:bg-green-900 w-full'>
            <img src={fotoPerfil} alt="" className='w-[24px] h-[24px] rounded-full'/>
            <div id='userinfo'>
            <span className='font-bold'>Gabo</span>
            </div>
        </div>
    </div>
  )
}
