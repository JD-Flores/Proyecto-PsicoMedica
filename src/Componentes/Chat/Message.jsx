import React from 'react'
import foto from '../../imagenes/fotoPerfil.jpg'

export function Message() {
  return (
    <div id='message' className='flex gap-5 mb-3'>
        <div className='flex flex-col text-gray-300 text-xs'>
            <img src={foto} alt="" className='w-[40px] object-cover'/>
            <span>Just now</span>
        </div>
        <div className='flex flex-col max-w-[80%]'>
            <p className='bg-black text-white p-2 rounded max-w-fit'>Hola</p>
            <img src={"foto"} alt="" className='w-1/2'/>
        </div>
    </div>
  )
}
