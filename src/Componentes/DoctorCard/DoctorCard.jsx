import React from 'react'
import estrella from "../../imagenes/Estrella_amarilla.png";
import estrellagris from "../../imagenes/estrella gris.png";

export function DoctorCard({info}) {
  return (
    <div className='flex flex-col items-center bg-white rounded-3xl w-[320px] h-[420px]'>
        <img className='rounded-full w-[110px] h-[110px] mb-2 mt-6 border-indigo-600' src={info.profilePic} alt="Image from doctor" />
        <h1 className='mb-2 font-comfortaa font-semibold text-[18px]'>Psicólogo</h1>
        <h1 className='text-[16px] text-center mb-2 font-semibold font-poppins'>{info.name} {info.lastname}</h1>
        <h1 className='font-comfortaa text-[14px] mb-3'>{info.Experience}+ años de experiencia</h1>
       
        <div className='bg-[#EBE6F6] rounded-2xl text-[15px] p-2 mb-3 font-medium'>
        <h1>{info.specialty}</h1>
        </div>
        
        
        {info.ranking==1 && <div className='flex flex-row'>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
        </div> }

        {info.ranking==2 && <div className='flex flex-row'>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
        </div> }

        {info.ranking==3 && <div className='flex flex-row'>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
        </div> }

        {info.ranking==4 && <div className='flex flex-row'>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrellagris}/>
        </div> }

        {info.ranking==5 && <div className='flex flex-row'>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
          <img className='flex flex-row w-[25px] justify-center' src={estrella}/>
        </div> }
        
        <div className='bg-[#5974A9] rounded-lg text-[15px] p-2 mt-7'>
        <h1 className='text-white font-comfortaa'>Agendar</h1>
        </div>

      
    </div>
  )
}
