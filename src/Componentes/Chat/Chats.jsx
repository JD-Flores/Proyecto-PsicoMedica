import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../contexts/chatContext';
import { useUser } from '../../contexts/UserContext';
import { db } from '../../firebase/config';

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
    <div className='w-full overflow-hidden text-ellipsis p-1'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>(
        <div 
        id='userchat' 
        key={chat[0]} 
        onClick={()=>handleSelect(chat[1].userInfo)}
        className='flex flex-row p-2 items-center gap-3 text-white hover:bg-green-900 cursor-pointer w-full'>       
          <img 
          src={chat[1].userInfo.photoURL} 
          alt="" 
          className='w-[30px] h-[30px] object-cover rounded-[50%]'/>
         <div id='userinfo' className='flex flex-col w-full overflow-hidden '>
        <span 
          className='font-bold'>
          {chat[1].userInfo.name}</span>
        <p 
        className='w-4/5 text-xs text-gray-300 truncate '>
          {chat[1].lastMessage?.text!=""&&
          chat[1].lastMessage?.text
          }
          {chat[1].lastMessage?.text==""&&
          "photo."
          }
          </p>
        </div>
    </div>
      ))}
        
    </div>
  )
}
