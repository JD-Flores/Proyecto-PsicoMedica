import React, { useContext, useState } from 'react'
import fotoPerfil from '../../imagenes/fotoPerfil.jpg'
import { collection,where,getDocs, query, setDoc, updateDoc, serverTimestamp, getDoc,doc } from '@firebase/firestore'
import { auth, db } from '../../firebase/config'
import { async } from '@firebase/util'
import { useUser } from '../../contexts/UserContext'
// import { updateCurrentUser } from '@firebase/auth'

export function Search() {
    const [username,setUsername]= useState("")
    const [user2, setUser2]=useState(null)
    const{user}=useUser();

   const handleSearch = async ()=>{
    const query2 = query(collection(db,"users"),where("name","==",username))
    try{
    const querySnapshot = await getDocs(query2);
    querySnapshot.forEach((doc)=>{
        setUser2(doc.data())
    })
    }  catch(error){

    } 
   };

    const handleKey = e=>{
        e.code == "Enter" && handleSearch()
    }
    const handleSelect= async()=>{
        //revisa si ya existe chat entre ambos usuarios
        const combinedID = user.uid > user2.uid ? 
        user.uid + user2.uid : 
        user2.uid + user.uid;
        const res = await getDoc(doc(db,"chats",combinedID));
        try{    
            
            if(!res.exists()){
                //crea el chat
                await setDoc(doc(db,"chats",combinedID),{messages:[]});
                
                //crea user chats
                await updateDoc(doc(db,"userChat",user.uid),{
                    [combinedID+".userInfo"]:{
                        uid:user2.uid,
                        name:user2.name,
                        // photoURL:user2.photoURL
                    },
                    [combinedID+".date"]: serverTimestamp()
                })
                await updateDoc(doc(db,"userChat",user2.uid),{
                    [combinedID+".userInfo"]:{
                        uid:user.uid,
                        name:user.name,
                        // photoURL:user.photoURL
                    },
                    [combinedID+".date"]: serverTimestamp()
                })
            }
        }catch{
            console.error("error")
        }
    setUser2(null);
    setUsername("")
    }
  return (
    <div className='w-full'>
        <div>
            <input type="text" name="" id="" placeholder='Search'
            className='p-2 bg-transparent text-white border-none outline-none placeholder-gray-300 w-full' 
            onChange={e=>setUsername(e.target.value)}
            onKeyDown={handleKey}
            value={username}/>
        </div>
        {user2 &&
        <div id='userchat' onClick={handleSelect}
        className='flex flex-row p-2 items-center gap-3 text-white hover:bg-green-900 w-full cursor-pointer'>
            <img src={user2.photoURL} alt="" className='w-[24px] h-[24px] rounded-full'/>
            <div id='userinfo'>
            <span className='font-bold text-white'>{user2.name}</span>
            </div>
        </div>}
    </div>
  )
}
