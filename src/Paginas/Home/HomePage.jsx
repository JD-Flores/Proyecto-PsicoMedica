import React from 'react'
import imagenHomepage1 from  "../../imagenes/homepage1.png";


export function HomePage() {

  return (
    <div className='box-border p-0 m-0 scroll-smooth'> {/*Contenedor principal*/}
        <div className='flex bg-[#5974A9]'> {/*Primera vista de la Homepage con imagen*/}
            <div className='ml-[20px] leading-normal'> {/*Lado izquierdo de la vista*/}
                <h1 className='text-white text-[33px] font-alfa-slab-one mb-[5px] mt-[20px] sm:text-4xl, md:text-6xl ' >PsicoMedica</h1>
                <h2 className='text-[20px] font-alfa-slab-one text-white mb-[10px] ' >Atención psicológica online</h2>
                <h4 className='text-[15px]  text-white'>El autocuidado y la salud mental son clave para mantener una vida plena y saludable</h4>
                <button className=' text-white bg-[#EF3D3E] font-comfortaa text-[14px] border-indigo-500 hover:shadow p-2 rounded-[6px] mt-[15px] mb-[15px] '>Agendar Cita</button>
            </div>
            <div className='flex w-[708px] h-[300px] '> {/*Lado derecho de la vista con imagen*/}
              <img src={imagenHomepage1} alt="Imagen principal de la página" className=' w-[500px] h-[250px]  items-center justify-center  mt-[17px]   ;'/>
            </div>
        </div> 




    </div>

  )
}
