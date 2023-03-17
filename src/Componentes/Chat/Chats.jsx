import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useUser } from '../../contexts/UserContext';
import { db } from '../../firebase/config';
import fotoPerfil from '../../imagenes/fotoPerfil.jpg'

export function Chats() {

  const [chats,setChats]=useState([]);
  const{user}=useUser();

  useEffect(()=>{
    const getChats = ()=>{
      const unsub = onSnapshot(doc(db,"userChat",user.uid),(doc)=>{
        setChats(doc.data())
      });
      return()=>{
        unsub();
      };
    }
    user.uid && getChats()
  },[user.uid])

  return (
    <div className=''>
      {Object.entries(chats)?.map((chat)=>(
        <div id='userchat' key={chat[0]}
        className='flex flex-row p-2 items-center gap-3 text-white hover:bg-green-900 w-full'>
        <img src={fotoPerfil} alt="" className='w-[24px] h-[24px] rounded-full'/>
        <div id='userinfo'>
        <span className='font-bold'>{chat[1].userInfo.name}</span>
        <p className='text-xs text-gray-300'>{chat[1].userInfo.lastMessage?.text}</p>
        </div>
    </div>
      ))}
        
    </div>
  )
}
