import React, { useContext, useEffect, useState } from 'react'
import { Message } from './Message'
import file from '../../imagenes/attach.png'
import image from '../../imagenes/imageicon.png'
import { ChatContext } from '../../contexts/chatContext'
import { arrayUnion, doc, getDoc, getDocFromServer, getDocs, onSnapshot, onSnapshotsInSync, query, serverTimestamp, Timestamp, updateDoc } from '@firebase/firestore'
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
    const [loadImg,setLoadImg] = useState()
    const [available,setAvailable]=useState(true)
    const [found,setFound]=useState(false)
    const [click,setClick]=useState(0)
    

      const checkAvailable= async()=>{
        const citas = await getDoc(doc(db,"calendarios",data.user.uid))
        const dates=citas.data().citas
        setFound(false)
        setAvailable(true)
        dates.map((date)=>(
            check(date)
        ))
        
      }
      const check = (date)=>{
        const hour = new Date()
        if(date?.uid==user.uid){
            const reserveTime = new Date(date.info.start)
            const reserveEndTime = new Date(date.info.end);
            if(reserveTime<hour & reserveEndTime>hour){
                setAvailable(false)
                setFound(true)
            }else{
                if(found!=true){
                setAvailable(true)

                }
            }
            
        }
        
      }

    useEffect(()=>{
        const unSub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
            doc.exists()&& setMessages(doc.data().messages)
            checkAvailable()

        })
        return ()=>{
            unSub()
        }
    },[data.chatId])

    const handleSend = async()=>{
        if(text!=""||img){
        if(img){
            const storageRef = ref(store,uuid())

            const uploadTask = uploadBytesResumable(storageRef,img)

            uploadTask.on(
                (error)=>{
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
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
}

  return (
    
    <div className='flex flex-col w-2/3'>
        <div className='flex items-center w-full p-2 bg-black text-white h-[50px]'>
            <span>{data.user?.name}</span>
            {/* <button onClick={}>Actualizar</button> */}
        </div>
        <div className='w-full h-full p-2 overflow-y-scroll'>
            {messages.map((m)=>(
                <Message message={m} key={m.id}/>
            ))}
        </div>
        <div className='flex justify-between bg-blue-400 px-4'>
            <div className='flex items center justify center p-2 w-full'>
            <input 
            type="text" 
            onChange={e=>setText(e.target.value)}
            placeholder="Inserta un mensaje..."
            value={text}
            readOnly={available}
            className=' p-2 w-full outline-none text-black rounded bg-white '
            ></input>
            {/* <img src={img} alt="" className='w-[50px]'/> */}
            </div>
            <div id='iconos' className='flex items-center gap-2 '>
                {/* <img src={file} alt="" className='w-[24px] cursor-pointer'/> */}
                <input 
                type="file" onChange={e=>setImg(e.target.files[0])}
                id='file' 
                disabled={available}
                className='hidden'/>
                <label htmlFor="file">
                    <img src={image} alt="" className='w-[64px] cursor-pointer'/>
                </label>
                <button onClick={handleSend} className="text-2xl">Send</button>
            </div>
        </div>
    </div>
  )
}
