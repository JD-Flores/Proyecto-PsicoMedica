import React, { useContext, useState } from 'react'
import fotoPerfil from '../../imagenes/fotoPerfil.jpg'
import { collection,where,getDocs, query } from '@firebase/firestore'
import { auth, db } from '../../firebase/config'
import { async } from '@firebase/util'
import { useUser } from '../../contexts/UserContext'
import { updateCurrentUser } from '@firebase/auth'

export function Search() {
    const [username,setUsername]= useState("")
    const [user, setUser]=useState(null)
    const{currentUser}=useUser();

   const handleSearch = async ()=>{
    const query2 = query(collection(db,"users"),where("name","==",username))
    try{
    const querySnapshot = await getDocs(query2);
    querySnapshot.forEach((doc)=>{
        setUser(doc.data())
    })
    }  catch(error){

    } 
   };

    const handleKey = e=>{
        e.code == "Enter" && handleSearch()
    }
    const handleSelect= async()=>{
        const combinedID = currentUser.uid > user.uid ? 
        currentUser.uid + user.uid : 
        user.uid + currentUser.uid
        try{
            const res =await getDocs(db,"chats",combinedID)

        }catch{
            
        }

    }
  return (
    <div className='w-full'>
        <div>
            <input type="text" name="" id="" placeholder='Search'
            className='p-2 bg-transparent text-white border-none outline-none placeholder-gray-300 w-full' 
            onChange={e=>setUsername(e.target.value)}
            onKeyDown={handleKey}/>
        </div>
        {user &&
        <div id='userchat' onClick={handleSelect}
        className='flex flex-row p-2 items-center gap-3 text-white hover:bg-green-900 w-full'>
            <img src={user.photoURL} alt="" className='w-[24px] h-[24px] rounded-full'/>
            <div id='userinfo'>
            <span className='font-bold text-white'>{user.name}</span>
            </div>
        </div>}
    </div>
  )
}
