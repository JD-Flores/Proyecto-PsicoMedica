import { daysToWeeks } from 'date-fns/esm';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../contexts/chatContext';
import { useUser } from '../../contexts/UserContext';
import { db } from '../../firebase/config';

export function Chats() {

  const{user}=useUser();
  const {dispatch} = useContext(ChatContext);
  const [chats,setChats]=useState([]);
  const [archived,setArchived]=useState(false);
  const [chatToday,setChatToday]=useState();
  const [noArchive,SetNoArchive]=useState();
  const [tchats,setTchats]=useState();
  const [disable,setdisable]=useState(true);
  const setCons = (value)=>{
    console.log(value)
    setChatToday(value);
    console.log(chatToday)
  }
  const getChats = async ()=>{
    onSnapshot(doc(db,"userChat",user.uid),(doc)=>{
      setChats(doc.data());
    });
    const dbRef = doc(db, "userChat",user.uid);
        const docRef = await getDoc(dbRef);
        console.log(docRef.data());
        setChats(docRef.data());
  }
    const getFeedback = async ()=>{
      onSnapshot(doc(db,"calendarios",user.uid),(doc)=>{
        setChatToday(doc.data().citas);
      })
      const dbRef = doc(db, "calendarios",user.uid);
        const docRef = await getDoc(dbRef);
        console.log(docRef.data().citas);
        setCons(docRef.data().citas);
        console.log(chatToday);
        const start = new Date();
        const finish = new Date();
        start.setHours(0);
        start.setMinutes(0);
        finish.setHours(23);
        finish.setMinutes(59);
        const array =[];
        const array2=[];
        console.log(chatToday);
        const filters = chatToday?.filter(element => new Date(element.info.start)>start && new Date(element.info.start)<finish );
        const dobleFiltro = filters?.forEach((element,i) =>{
          const total = Object.entries(chats)?.filter(element2=>element.uid == element2[1].userInfo.uid) ;
          array.push(total[0]);
        } )
        setTchats(array);
        const verificacion=[];

         filters?.forEach((element,i) =>{
          verificacion.push(element.uid)//Pone en el array verificacion los uid de los clientes del dia de hoy  
        } )
        const total = Object.entries(chats)?.filter(element2=> !verificacion.includes(element2[1].userInfo.uid)) 
          array2.push(total[0]);
          SetNoArchive(array2);
          console.log(array2);
      
      
      setdisable(false);
    }
    
  
  useEffect(()=>{
    dispatch({type:"CHANGE_USER",payload:user});
    user.uid && getChats();
    getFeedback();
  },[user.uid])

  const handleSelect=(u)=>{
    dispatch({type:"CHANGE_USER",payload:u})
  }
  const handleChats = ()=>{
      setArchived(false)
  }
  const handleArchived = ()=>{
    setArchived(true)
  }

  return (
    <div className='w-full overflow-hidden text-ellipsis border-y-2 border-gray-300'>
      <div className='flex flex-row justify-evenly'>
        {user.doctor == true &&
        <>
        <button disabled={disable} className='text-white text-3xl' onClick={handleChats}>chats</button>
        <button disabled={disable} className='text-white text-3xl' onClick={handleArchived}>archive</button>
        </>
          }
      </div>
      {archived == false && user.doctor==false && Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>(
        <div 
        id='userchat' 
        key={chat[0]} 
        onClick={()=>handleSelect(chat[1].userInfo)}
        className='flex flex-row p-2 items-center gap-3 text-white hover:bg-blue-900 cursor-pointer w-full'>       
          <img 
          src={chat[1].userInfo?.photoURL} 
          alt="" 
          className='w-[50px] h-[50px] object-cover rounded-[50%]'/>
         <div id='userinfo' className='flex flex-col w-full overflow-hidden '>
        <span 
          className='font-bold text-xl'>
          {chat[1].userInfo?.name}</span>
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
      {archived == false && tchats?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>(
        <div 
        id='userchat' 
        key={chat[0]} 
        onClick={()=>handleSelect(chat[1].userInfo)}
        className='flex flex-row p-2 items-center gap-3 text-white hover:bg-blue-900 cursor-pointer w-full'>       
          <img 
          src={chat[1].userInfo?.photoURL} 
          alt="" 
          className='w-[50px] h-[50px] object-cover rounded-[50%]'/>
         <div id='userinfo' className='flex flex-col w-full overflow-hidden '>
        <span 
          className='font-bold text-xl'>
          {chat[1].userInfo?.name}</span>
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
      {archived == true && noArchive?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>(
        <div 
        id='userchat' 
        key={chat[0]} 
        onClick={()=>handleSelect(chat[1]?.userInfo)}
        className='flex flex-row p-2 items-center gap-3 text-white hover:bg-blue-900 cursor-pointer w-full'>       
          <img 
          src={chat[1]?.userInfo?.photoURL} 
          alt="" 
          className='w-[50px] h-[50px] object-cover rounded-[50%]'/>
         <div id='userinfo' className='flex flex-col w-full overflow-hidden '>
        <span 
          className='font-bold text-xl'>
          {chat[1]?.userInfo?.name}</span>
        <p 
        className='w-4/5 text-xs text-gray-300 truncate '>
          {chat[1]?.lastMessage?.text!=""&&
          chat[1]?.lastMessage?.text
          }
          {chat[1]?.lastMessage?.text==""&&
          "photo."
          }
          </p>
        </div>
    </div>
      ))}
        
    </div>
  )
}
