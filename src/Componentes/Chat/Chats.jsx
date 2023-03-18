import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../contexts/chatContext';
import { useUser } from '../../contexts/UserContext';
import { db } from '../../firebase/config';
import fotoPerfil from '../../imagenes/fotoPerfil.jpg'

export function Chats() {

  const [chats,setChats]=useState([]);
  const{user}=useUser();
  const {dispatch} = useContext(ChatContext)

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

  const handleSelect=(u)=>{
    dispatch({type:"CHANGE_USER",payload:u})
  }

  return (
    <div className=''>
      {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>(
        <div 
        id='userchat' 
        key={chat[0]} 
        onClick={()=>handleSelect(chat[1].userInfo)}
        className='flex flex-row p-2 items-center gap-3 text-white hover:bg-green-900 w-full'>
        <img 
        src={fotoPerfil} 
        alt="" 
        className='w-[24px] h-[24px] rounded-full'/>
        <div id='userinfo'>
        <span 
          className='font-bold'>
          {chat[1].userInfo.name}</span>
        <p 
        className='text-xs text-gray-300'>
          {chat[1].lastMessage?.text}</p>
        </div>
    </div>
      ))}
        
    </div>
  )
}
