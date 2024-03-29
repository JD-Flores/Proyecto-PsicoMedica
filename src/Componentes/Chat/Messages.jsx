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
import { createRoutesFromChildren, Link } from 'react-router-dom'
import { BUSCAR_DOC } from '../../constantes/urls'
import { completed } from '../../firebase/auth-service'
import { updateCompleted } from '../../firebase/users-service'
import { PopupFeedback } from '../Popup/PopupFeedback'



export function Messages() {
    const [messages, setMessages] = useState([])
    const {data} = useContext(ChatContext)
    const [text,setText] = useState("");
    const [img,setImg] = useState(null);
    const {user} = useUser();
    const [available,setAvailable]=useState(true)
    const [found,setFound]=useState(false)
    const [open, setOpen] = useState(false)
    const [cita,setCita]=useState([])
    

      const checkAvailable= async()=>{
        const citas = await getDoc(doc(db,"calendarios",data.user.uid))
        // console.log(citas.data().citas)
        const dates=citas.data()?.citas
        setFound(false)
        setAvailable(true)
        dates?.map((date)=>(
            check(date)
        ))
        
      }
      const check = (date)=>{
        // date.completed=true;
        const hour = new Date()
        if(date?.uid==user.uid & date?.completed == false){
            const reserveTime = new Date(date.info.start)
            const reserveEndTime = new Date(date.info.end);
            // reserveTime.setHours(22)
            // reserveTime.setDate(27)
            // reserveEndTime.setHours(23)
            // reserveEndTime.setDate(27)
            // console.log(hour)
            // console.log(reserveTime)
            // console.log(reserveEndTime)
            if(reserveTime<hour & reserveEndTime>hour){ //la reserva esta en curso y desbloquea el input
                setAvailable(false);
                setFound(true);
                return;
            }if (reserveEndTime<hour) {
                updateCompleted(data.user,true,date.id)// reserva ya paso y se pone el estado completado en true
            } else {
                if(found!=true){
                    setAvailable(true)// reserva no ha pasado y bloquea el input
                    }
            }
            
        }if (date?.uid==user.uid & date.completed==true & date.ranked =="undefined") {
            //aqui que se agregue a una lista de citas por rankear
            // alert("")
            setOpen(true)
            setCita(date)
        } else {
            // console.log("resto")
            // console.log(date)
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
    
    <div className='flex flex-col   h-full  bg-white'>
        <PopupFeedback setOpen={setOpen} open={open} cita={cita} doctor={data.user} user={user} />
        <div className='flex justify-center items-center w-full text-3xl p-2 lg:p-3 bg-[#5974A9] text-white h-[70px]'>
            <span>{data.user?.name}</span>
            
            {/* <button onClick={}>Actualizar</button> */}
        </div>
        <div className='w-full h-full overflow-y-scroll  bg-[#D1D5DB]'>
            {messages.map((m)=>(
                <Message message={m} key={m.id}/>
            ))
            }
            
            {data.user.uid==user.uid && user.doctor==false &&
            <div className='flex flex-col items-center justify-center h-full bg-gray-500 mt-1'>
            <p className='font-bold text-white text-[15px] lg:text-xl text-center font-comfortaa'>Agenda una cita para empezar a Chatear</p>
            <Link to={BUSCAR_DOC} className="text-[12px] sm:text-[16px] lg:text-lg text-white bg-[#EF3D3E] font-comfortaa font-semibold  border-indigo-500 hover:shadow p-2 rounded-[6px] mt-[15px] mb-[15px]" >Agendar Cita</Link>
            </div>
            }
            {data.user.uid==user.uid && user.doctor==true &&
            <div className='flex flex-col items-center justify-center h-full bg-gray-500'>
            <p className='font-bold text-white text-[15px] lg:text-xl text-center font-comfortaa'>Seleccione un chat con un cliente o espere a que clientes reserven citas</p>
            </div>
            }
            
        </div>
        <div className='flex justify-between bg-[#5974A9] p-1 pl-0 pr-5'>
            <div className='flex items center justify center w-full p-2'>
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
