import React from 'react'
import { ProfileNav } from '../../Componentes/ProfileNav/ProfileNav'
import { DOC_DETAIL } from '../../constantes/urls'
import Lupa from "../../imagenes/search-line.png";

export function BuscarDoc() {
  return (
    <div id='main-container' className=' flex flex-col justify-center items-center gap-[13px] py-[17px]'>
      
      <div id='top-container'className=''>
        <ProfileNav></ProfileNav>
      </div>
      
      <div id='middle-container' className='flex flex-row justify-center gap-[5px]'>
        <input id='buscador' className='w-[309px] h-[50px] bg-[#FFFFFF] rounded-[12px] p-[13px]' placeholder='Introduzca el nombre del doctor'></input>
        <button id='buscar' className='bg-[#908989] w-[50px] h-[50px] rounded-[12px] flex justify-center items-center'><img className="w-[24px] h-[24px]" src={Lupa} alt="" /></button>
        


      </div>
      
      <div id='bottom-container' className='w-[363px] h-[648px] bg-[#FFFFFF] rounded-[12px]'>
        
      </div>
      
    </div>
  )
}
