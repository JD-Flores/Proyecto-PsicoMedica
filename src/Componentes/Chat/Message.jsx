import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../../contexts/chatContext';
import { UserContext, useUser } from '../../contexts/UserContext'
import foto from '../../imagenes/fotoPerfil.jpg'

export function Message({message}) {
  const {user} = useUser();
  const {data} = useContext(ChatContext)
  // const [chats,setChats] = useState();

  const ref = useRef()

  useEffect(()=>{
    ref.current.scrollIntoView({behavior:"smooth"})
  },[message])


  return (
    <div ref={ref}>
      {message.senderId===user.uid&&
        <div id='message' className='flex flex-row-reverse items-center gap-5 mb-3 '>
        <div className='flex flex-col items-center text-gray-300 text-xs'>
            <img 
            src={user.profilePic}
             alt="" 
             className='w-[40px] h-[40px] object-cover rounded-[50%]'/>
             <div className='flex flex-col items-center'>
             <span>{message.date.toDate().toString().slice(3,15)}</span>
            <span>{message.date.toDate().toString().slice(15,25)}</span>
             </div>
            
        </div>
        <div className='flex flex-col flex-wrap max-w-[60%] break-words h-auto  '>
             <img src={message.img} alt="" className='max-w-[250px] rounded' />
            
            {message.text != ""&&
            <p className='flex flex-col items-start bg-blue-800 text-white p-2 rounded-l rounded-tr  break-all'>
            {message.text}
            </p>
            }
            
        </div>
        
    </div>
      }
      {message.senderId!=user.uid&&
        <div id='message' className='flex items-center gap-5 mb-3'>
        <div className='flex flex-col items-center text-gray-300 text-xs'>
        <img 
        src={data.user.photoURL}
         alt="" 
         className='w-[40px] h-[40px] object-cover rounded-[50%]'/>
        <div className='flex flex-col items-center'>
             <span>{message.date.toDate().toString().slice(3,15)}</span>
            <span>{message.date.toDate().toString().slice(15,25)}</span>
             </div>
    </div>
    
    <div className='flex flex-col flex-wrap max-w-[60%] break-words h-auto  '>
            <img src={message.img} alt="" className='max-w-[250px] rounded' />
            
            {message.text != ""&&
            <p className='flex flex-col items-start bg-green-800 text-white p-2 rounded-r rounded-tl  break-all'>
            {message.text}
            </p>
            }
            
            
        </div>
    </div> 
      }


    </div> 
  )
}
