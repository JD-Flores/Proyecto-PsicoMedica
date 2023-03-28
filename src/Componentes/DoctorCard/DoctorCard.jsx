import React from 'react'

export function DoctorCard({info}) {
  return (
    <div className='flex flex-col items-center bg-white'>
        <img className='rounded-full w-[110px] h-[110px] mb-2' src={info.profilePic} alt="Image from doctor" />
        <h1 className='mb-2'>Psicólogo</h1>
        <h1 className='text-[13px] text-center mb-2'>{info.name}</h1>
        <h1>Descripción</h1>
        <p>Agendar</p>


    </div>
  )
}
