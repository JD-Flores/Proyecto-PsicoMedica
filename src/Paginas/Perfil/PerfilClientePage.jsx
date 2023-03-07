import React from 'react'

export function PerfilClientePage() {
  return (
    <div id='container' className=' flex justify-center items-center w-screen h-full'>
      <div id='firstHalf' className='w-1/5 h-full items-center'>
        <div className='w-3/4 mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 h-3/4'>

        </div>

      </div>
      <div id='secondHalf' className='w-3/5'>
        <p>hola2</p>
      </div>
      <div id='thirdHalf' className='w-1/5'>
        <p>hola3</p>
      </div>

    </div>
  )
}
