import React from 'react'
import estrella from "../../imagenes/Estrella_amarilla.png";
import estrellagris from "../../imagenes/estrella gris.png";
import { useState, useEffect } from 'react';

export default function GlobalFeedback({info}) {

  const [redondeo, setRedondeo] = useState();

  useEffect(() => {
    handleRedondeo();
  }, []);

  const handleRedondeo= () => {
    setRedondeo(Math.round(info.ranking));
  }


  return (
    <div className='flex flex-col items-center bg-white rounded-3xl w-[220px] m-[4px] p-2'>
        <h1 className='mb-2 font-comfortaa font-semibold text-[18px]'>{info.name} {info.lastname}</h1>

        <div>
        <h1 className='mb-2 font-comfortaa font-semibold text-[18px] text-center'>Calificación</h1>
        
        
        {redondeo==1 && <div className='flex flex-row mb-2'>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
        </div> }

        {redondeo==2 && <div className='flex flex-row mb-2'>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
        </div> }

        {redondeo==3 && <div className='flex flex-row mb-2'>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
        </div> }

        {redondeo==4 && <div className='flex flex-row mb-2'>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
        </div> }

        {redondeo==5 && <div className='flex flex-row mb-2'>
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
    </div>
  )
}
