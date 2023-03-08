import React from 'react'
import imagenHomepage1 from  "../../imagenes/homepage1.png";
import imageVentaja1 from  "../../imagenes/img1.jpg";
import imageVentaja2 from  "../../imagenes/img2.jpg";
import imageVentaja3 from  "../../imagenes/img3.jpg";
import Number from '../../Componentes/LandingPage/Number';


export function HomePage() {

  return (
    <div className='box-border p-0 m-0 scroll-smooth'> {/*Contenedor principal*/}
        <div className='flex bg-[#5974A9]'> {/*Primera vista de la Homepage con imagen*/}
            <div className='ml-[20px] leading-normal'> {/*Lado izquierdo de la vista*/}
                <h1 className='text-white text-[25px] font-alfa-slab-one mb-[5px] mt-[20px] sm:text-4xl, md:text-6xl ' >PsicoMedica</h1>
                <h2 className='text-[17px] font-alfa-slab-one text-white mb-[10px] ' >Atención psicológica online</h2>
                <h4 className='text-[12px]  text-white'>El autocuidado y la salud mental son clave para mantener una vida plena y saludable</h4>
                <button className=' text-white bg-[#EF3D3E] font-comfortaa text-[14px]  border-indigo-500 hover:shadow p-2 rounded-[6px] mt-[15px] mb-[15px]'>Agendar Cita</button>
            </div>
            <div className='flex w-[708px] h-[300px] '> {/*Lado derecho de la vista con imagen*/}
              <img src={imagenHomepage1} alt="Imagen principal de la página" className=' w-[500px] h-[250px]  items-center justify-center  mt-[17px] '/>
            </div>
        </div>

        <div className='flex flex-col bg-white items-center justify-center ' > {/*Contenedor de descripción de la app*/}
            <h1 className=' text-[17px] mt-[15px] mb-[15px]'>Encuentra al psicólogo que se adapte más a ti</h1>

            <div className=' flex mt-[-5px] flex-row ml-1' > {/*Contenedor de ventajas de la app*/}
              <div className='flex flex-col items-center justify-between '> {/*Contenedor de ventaja 1*/}
                  <img src={imageVentaja1} alt="imagen de ventaja 1" className='w-[130px] h-[130px]' />
                  <h1 className='text-[12px] text-center whitespace-nowrap'>Psicólogos Certificados</h1>
                  <h3 className='text-[9px] text-center mt-[8px]'>Nuestra plataforma cuenta con psicólogos certificados y capacitados para realizar terapia</h3>
              </div>

              <div className='flex flex-col items-center '> {/*Contenedor de ventaja 2*/}
                <img src={imageVentaja2} alt="imagen de ventaja 2 " className='w-[130px] h-[130px]' />
                <h1 className='text-[12px] ml-1'>Terapia a tu alcance</h1>
                <h3 className='text-[9px] text-center mt-[8px]'> La consulta es totalmente Online, podrás contactar a tu psicólogo cada vez que lo necesites</h3>
              </div>

              <div className='flex flex-col items-center '> {/*Contenedor de ventaja 2*/}
                <img src={imageVentaja3} alt="imagen de ventaja 3" className='w-[130px] h-[130px]' />
                <h1 className='text-[12px]'>Cómodo y seguro</h1>
                <h3 className='text-[9px] text-center mt-[8px]'>Los datos personales y la información proporcinada al especialista se mantendrá en privado y de manera confidencial</h3>
              </div>

          </div>

        </div>

        <div>
          <h1>TO DO SECCIÓN PSICÓLOGOS </h1>
        </div>

        <div className='bg-[#5974A9] flex flex-col '> {/*Contenedor de pasos a seguir para usar la app*/}
         <Number 
         number='1'
         title='Ingresa tus datos'
         description='Debes registrarte en la plataforma con tus datos personales'
         />
          <Number 
         number='2'
         title='Elige a tu psicólogo ideal'
         description='Contamos con psicologos especializados en diversas áreas'
         />
          <Number 
         number='3'
         title='Establece un horario'
         description='Elige un horario que se adecue a ti'
         />
          <Number 
         number='4'
         title='Compra tu sesión'
         description='A través de nuestra plataforma, podrás realizar tu pago por medio de Paypal'
         />
          <Number 
         number='5'
         title='¡Listo!'
         description='El especialista se pondrá en contacto a traves de nuestro chat personalizado'
         />

        </div>

        <div className='flex justify-center'> {/*Contenedor de preguntas frecuentes*/}
            <h1 className='text-[25px] mt-2 mb-2'>Preguntas Frecuentes - TO DO</h1>
        </div>

        <div> {/*Contenedor de calificación*/}
          TODO
        </div>


    </div>

  )
}
