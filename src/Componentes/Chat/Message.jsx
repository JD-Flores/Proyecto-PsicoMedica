import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../../contexts/chatContext';
import { UserContext, useUser } from '../../contexts/UserContext'
import foto from '../../imagenes/fotoPerfil.jpg'

export function Message({message}) {
  const {user} = useUser();
  const {data} = useContext(ChatContext)

  const ref = useRef()

  useEffect(()=>{
    ref.current.scrollIntoView({behavior:"smooth"})
  },[message])

  return (
    <div ref={ref}>
      {message.senderId===user.uid&&
        <div id='message' className='flex flex-row-reverse gap-5 mb-3 '>
        <div className='flex flex-col text-gray-300 text-xs'>
            <img 
            src={foto}
             alt="" 
             className='w-[40px] object-cover'/>
            <span>Just now</span>
        </div>
        <div className='flex flex-col max-w-[80%]'>
            <p className='bg-black text-white p-2 rounded-l rounded-tr  max-w-fit'>{message.text}</p>
            <img src={"foto"} alt="" className='w-1/2'/>
        </div>
        
    </div>
      }
      {message.senderId!=user.uid&&
        <div id='message' className='flex gap-5 mb-3'>
        <div className='flex flex-col text-gray-300 text-xs'>
        <img 
        src={foto}
         alt="" 
         className='w-[40px] object-cover'/>
        <span>Just now</span>
    </div>
    <div className='flex flex-col max-w-[80%]'>
        <p className='bg-black text-white p-2 rounded-r rounded-tl max-w-fit'>{message.text}</p>
        <img src={"foto"} alt="" className='w-1/2'/>
    </div>
    </div> 
      }


    </div> 
  )
}
