import React, { useContext, useEffect, useState } from 'react'
import { Message } from './Message'
import file from '../../imagenes/attach.png'
import image from '../../imagenes/imageicon.png'
import sendIcon from '../../imagenes/sendIcon.png'
import { ChatContext } from '../../contexts/chatContext'
import { arrayUnion, doc, getDoc, getDocFromServer, getDocs, onSnapshot, onSnapshotsInSync, query, serverTimestamp, Timestamp, updateDoc } from '@firebase/firestore'
import { db,store  } from '../../firebase/config'
// import { async } from '@firebase/util'
import { v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import { useUser } from '../../contexts/UserContext'
import { Link } from 'react-router-dom'
import { BUSCAR_DOC } from '../../constantes/urls'


export function Messages() {
    const [messages, setMessages] = useState([])
    const {data} = useContext(ChatContext)
    const [text,setText] = useState("");
    const [img,setImg] = useState(null);
    const {user} = useUser();
    const [loadImg,setLoadImg] = useState()
    const [available,setAvailable]=useState(true)
    const [found,setFound]=useState(false)
    const [timer,setTimer]=useState(false)
    

      const checkAvailable= async()=>{
        const citas = await getDoc(doc(db,"calendarios",data.user.uid))
        const dates=citas.data().citas
        setFound(false)
        setAvailable(true)
        dates?.map((date)=>(
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
            if(user.doctor == false){
                checkAvailable()
            }else{
                setAvailable(false)
            }

        })
        return ()=>{
            unSub()
        }
    },[data.chatId])

    const handleSend = async()=>{
        if(data.user.uid!=user.uid){
        if(text!=""||img ){
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
}

  return (
    
    <div className='flex flex-col w-2/3 '>
        <div className='flex items-center w-full text-3xl p-2 bg-blue-800 text-white h-[70px]'>
            <span>{data.user?.name}</span>
            
            {/* <button onClick={}>Actualizar</button> */}
        </div>
        <div className='w-full h-full p-2 overflow-y-scroll'>
            {messages.map((m)=>(
                <Message message={m} key={m.id}/>
            ))
            }
            
            {data.user.uid==user.uid && user.doctor==false &&
            <div className='flex flex-col items-center justify-center h-full bg-gray-500'>
            <p className='text-white text-xl'>Reserva una cita para empezar a Chatear</p>
            <Link to={BUSCAR_DOC} className="text-[12px] sm:text-[16px] lg:text-lg text-white bg-[#EF3D3E] font-comfortaa   border-indigo-500 hover:shadow p-2 rounded-[6px] mt-[15px] mb-[15px]" >Agendar Doctores</Link>
            </div>
            }
            {data.user.uid==user.uid && user.doctor==true &&
            <div className='flex flex-col items-center justify-center h-full bg-gray-500'>
            <p className='text-white text-xl'>Seleccione un chat con un cliente o espere a que clientes reserven citas.</p>
            </div>
            }
            
        </div>
        <div className='flex justify-between bg-blue-700 p-1 pl-0 pr-5'>
            <div className='flex items center justify center w-full'>
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
                <button onClick={handleSend} className="flex items-center gap-2 text-2xl text-black"><img className=" h-[40px]" src={sendIcon}></img></button>
            </div>
        </div>
    </div>
  )
}
