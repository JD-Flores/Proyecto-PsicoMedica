import React from 'react'
import estrella from "../../imagenes/Estrella_amarilla.png";
import estrellagris from "../../imagenes/estrella gris.png";

export function FeedbackCard(props) {
  return (
    <div className='flex flex-col items-center bg-white rounded-3xl w-[220px] m-[4px]'>
        <h1 className='mb-2 font-comfortaa font-semibold text-[18px]'>{props.name} {props.lastname}</h1>
        <h1 className='text-[16px] text-center mb-2 font-semibold font-poppins'>{props.date}</h1>

        <div>
        <h1 className='mb-2 font-comfortaa font-semibold text-[18px] text-center'>Calificación</h1>
        
        
        {props.ranking==1 && <div className='flex flex-row mb-2'>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
        </div> }

        {props.ranking==2 && <div className='flex flex-row mb-2'>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
        </div> }

        {props.ranking==3 && <div className='flex flex-row mb-2'>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
        </div> }

        {props.ranking==4 && <div className='flex flex-row mb-2'>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
        </div> }

        {props.ranking==5 && <div className='flex flex-row mb-2'>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
        </div> }
        
        {/* <div className='bg-[#5974A9] rounded-lg text-[15px] p-2 mt-7'>
        <h1 className='text-white font-comfortaa'>Agendar</h1>
        </div> */}

        </div>

        <h1 className='mb-2 font-comfortaa font-semibold text-[18px] text-center'>Reseña</h1>
        <div className='bg-[#EBE6F6] rounded-2xl text-[15px] text-center p-3 mb-3 font-medium break-all '>
        <h1>{props.review}</h1>
        </div>

        
    </div>
  )
}
