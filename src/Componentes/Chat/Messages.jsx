import React, { useContext, useEffect, useState } from 'react'
import { Message } from './Message'
import file from '../../imagenes/attach.png'
import image from '../../imagenes/imageicon.png'
import { ChatContext } from '../../contexts/chatContext'
import { arrayUnion, doc, onSnapshot, serverTimestamp, Timestamp, updateDoc } from '@firebase/firestore'
import { db,store  } from '../../firebase/config'
// import { async } from '@firebase/util'
import { v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import { useUser } from '../../contexts/UserContext'


export function Messages() {
    const [messages, setMessages] = useState([])
    const {data} = useContext(ChatContext)
    const [text,setText] = useState("");
    const [img,setImg] = useState(null);
    const {user} = useUser();

    useEffect(()=>{
        const unSub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
            doc.exists()&& setMessages(doc.data().messages)
        })
        return ()=>{
            unSub()
        }
    },[data.chatId])

    const handleSend = async()=>{

        if(img){
            const storageRef = ref(store,uuid())

            const uploadTask = uploadBytesResumable(storageRef,img)
            uploadTask.on(
                (error)=>{

                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then(async(getDownloadURL)=>{
                        await updateDoc(doc(db,"chats",data.chatId),{
                            messages:arrayUnion({
                                id:uuid(),
                                text,
                                senderId:user.uid,
                                date: Timestamp.now(),
                                img: downloadURL
                            })
                        })
                    })
                }
            )
        }else{
            await updateDoc(doc(db,"chats",data.chatId),{
                messages:arrayUnion({
                    id: uuid(),
                    text,
                    senderId:user.uid,
                    date:Timestamp.now(),
                })
            })
        }
            await updateDoc(doc(db,"userChat",user.uid),{
                [data.chatId+".lastMessage"]:{
                    text
                },
                [data.chatId+".date"]: serverTimestamp()
            })
            await updateDoc(doc(db,"userChat",data.user.uid),{
                [data.chatId+".lastMessage"]:{
                    text
                },
                [data.chatId+".date"]: serverTimestamp()
            })
            setText("")
            setImg(null)
    }

  return (
    <div className='flex flex-col w-2/3'>
        <div className='w-full p-2 bg-black text-white'>
            <span>{data.user?.name}</span>
        </div>
        <div className='w-full h-full p-2 overflow-y-scroll'>
            {messages.map((m)=>(
                <Message message={m} key={m.id}/>
            ))}
        </div>
        <div className='flex justify-between'>

            <input 
            type="text" 
            onChange={e=>setText(e.target.value)}
            placeholder='Inserta un mensaje'
            value={text}
            className=' bg-black p-2 w-full outline-none text-white'
            />
            <div id='iconos' className='flex items-center gap-2 '>
                <img src={file} alt="" className='w-[24px] cursor-pointer'/>
                <input 
                type="file" onChange={e=>setImg(e.target.files[0])}
                id='file' 
                className='hidden'/>
                <label htmlFor="file">
                    <img src={image} alt="" className='w-[48px] cursor-pointer'/>
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    </div>
  )
}
