import React from 'react'
import { Message } from './Message'
import file from '../../imagenes/attach.png'
import image from '../../imagenes/imageicon.png'

export function Messages() {
  return (
    <div className='flex flex-col w-2/3'>
        <div className='w-full p-2 bg-black text-white'>
            <span>Gabo</span>
        </div>
        <div className='w-full h-full p-2 overflow-y-scroll'>
            <Message></Message>
            <Message></Message>
            <Message></Message>
            <Message></Message>
            <Message></Message>
            <Message></Message>
            <Message></Message>
            <Message></Message>
            <Message></Message>
        </div>
        <div className='flex justify-between'>
            <input type="text" placeholder='Inserta un mensaje'
            className=' bg-black p-2 w-full outline-none text-white'/>
            <div id='iconos' className='flex items-center gap-2 '>
                <img src={file} alt="" className='w-[24px] cursor-pointer'/>
                <input type="file" id='file' className='hidden'/>
                <label htmlFor="file">
                    <img src={image} alt="" className='w-[48px] cursor-pointer'/>
                </label>
                <button>Send</button>
            </div>
        </div>
    </div>
  )
}
