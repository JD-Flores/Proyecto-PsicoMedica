import React from 'react'
import { ProfileNav } from '../../Componentes/ProfileNav/ProfileNav'
import { DOC_DETAIL } from '../../constantes/urls'

export function BuscarDoc() {
  return (
    <div id='main-container' className=' flex flex-col justify-center w-screen h-full p-4'>
      
      <div id='top-container'>
        <ProfileNav></ProfileNav>
      </div>
      
      <div id='middle-container' className='flex flex-row'>
        <input id='buscador'  placeholder='Introduzca el nombre del doctor'></input>
        <button id='buscar'>Buscar</button>
        


      </div>
      
      <div id='bottom-container'>
        
      </div>
      
    </div>
  )
}
