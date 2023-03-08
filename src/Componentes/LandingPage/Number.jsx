import React from 'react'

function Number(props) {
  return (
    <div className='flex flex-col items-center'> {/*Contenedor de paso 1*/}
              <div className='bg-[#56C2A7] rounded-full w-[60px] h-[60px] items-center flex justify-center text-[40px] text-white mt-4 mb-2' > {/*Contenedor de número con circulo*/}
                  {props.number}
              </div>
              <h3 className='text-white text-[20px]' >{props.title}</h3>
              <h4 className='text-white text-center'>{props.description}</h4>
          </div>
  )
}

export default Number