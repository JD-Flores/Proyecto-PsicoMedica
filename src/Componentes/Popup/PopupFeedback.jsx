import React, { useState } from 'react'
import { doctorRating, feedbackDecision, handleFeedbackRating } from '../../firebase/users-service';
import Popup from 'reactjs-popup';

export  function PopupFeedback(props) {
  const [rating,setRating]=useState(0);
  const [review,setReview]=useState("");
  const [message, setMessage]= useState("");

  const handleNo = async ()=>{//Funcion que setea el rating de la funcion a no (de que el usuario decidio no dar una reseña)
      await feedbackDecision(props.doctor,"no",props.cita.id);
      props.setOpen(false)
  }
  const handleRating = async ()=>{//Funcion que agrega la reseña a la lista de reseñas del doctor
    if (rating==0) {
      setMessage("La calificación es requerida");
    }
    else{
      await handleFeedbackRating(props.doctor,props.user,props.cita.info.start,review,rating);
      await feedbackDecision(props.doctor,"yes",props.cita.id);
      await doctorRating(rating,props.doctor);
      props.setOpen(false);
    }
    
  }
  const handleTextArea = (event)=>{
    setReview(event.target.value);
  }
  const fiveStar = ()=>{
    setRating(5);
  }
  const fourStar = ()=>{
    setRating(4);
  }
  const threeStar = ()=>{
    setRating(3);
  }
  const twoStar = ()=>{
    setRating(2);
  }
  const oneStar = ()=>{
    setRating(1);
  }
  return (
    <Popup open={props.open} modal>
        {() => ( 
          <div className='flex flex-col h-[500px] w-[600px] bg-white border-blue-400 border-2'>
            <button className='text-white w-[50px] self-end bg-red-600'  onClick={() => props.setOpen(false)}>
              X
            </button>
            <div className='flex flex-col justify-evenly h-full p-4'>
            <div className='flex flex-col items-center flex-wrap'>
            <h1 className='text-2xl'>Califica la reunion</h1>
            <p>Motivo: {props.cita.info?.title}</p>
            <p>Fecha: {props.cita.info?.start}</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
            <textarea
              id="motivoCita"
              onChange={handleTextArea}
                className="w-[400px] h-[170px] p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm resize-none mb-2"
                type="text"
                placeholder="Deja un mensaje acerca de tu experiencia... [máx. 200 caracteres]"
              />
                <div className='flex flex-row gap-3'>
                  <div className="flex items-center flex-row-reverse cursor-pointer">
                    <svg aria-hidden="true" onClick={fiveStar} className="w-8 h-8 peer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" onClick={fourStar} className="w-8 h-8 peer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" onClick={threeStar} className="w-8 h-8 peer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" onClick={twoStar} className="w-8 h-8 peer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" onClick={oneStar} className="w-8 h-8 peer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  </div>
                  <p className='text-xl font-bold'>{rating}/5</p>
                 </div>
                 <p className='text-red-500'>{message}</p>
                 </div>
            <div className='flex flex-col gap-2'>
              <p className='self-center'>Desea dejar una reseña?</p>
              <div className='flex justify-evenly'>
                <button className='bg-blue-600 p-2 text-white rounded hover:bg-blue-800' onClick={handleRating} >Dejar Reseña</button>
                <button className='bg-blue-600 p-2 text-white rounded hover:bg-blue-800' onClick={handleNo}>No gracias!</button>
              </div>
              
            </div>
          </div>
          </div>
          
        )}
      </Popup>
  )
}
