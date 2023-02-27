import React from 'react'
import { Link } from "react-router-dom";
import { HOME_URL, LOGIN_URL, REGISTER_URL } from '../../constantes/urls';
// import { HOME_URL } from '../../constantes/urls';


export function Navbar() {
  return (
    <nav id="header" class="w-full z-30 top-10 py-1 shadow-lg border-b border-blue-400 ">
      <div class="w-full flex items-center justify-between mt-0 px-6 py-2">
      <div class="group inline-block md:hidden block">
            <button
                class="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32"
            >
                <span class="pr-1 font-semibold flex-1">Menu</span>
                <span>
                <svg
                    class="fill-current h-4 w-4 transform group-hover:-rotate-180
                    transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                </svg>
                </span>
            </button>
            <ul
                class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
            transition duration-150 ease-in-out origin-top min-w-32"
            >
                <li  class="rounded-sm px-3 py-1 hover:bg-gray-100"><Link to={HOME_URL}>Inicio</Link></li>
                <li class="rounded-sm px-3 py-1 hover:bg-gray-100"><Link to={HOME_URL}>Nosotros</Link></li>
                <li class="rounded-sm px-3 py-1 hover:bg-gray-100"><Link to={HOME_URL}>FAQ</Link></li>
            </ul>
            </div>
         <div class="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1 overflow-y-auto" id="menu">
            <nav>
               <ul class="md:flex items-center justify-between text-base text-white pt-4 md:pt-0">
                  <li><Link to={HOME_URL} class="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2" >Inicio</Link></li>
                  <li><Link to={HOME_URL} class="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2" >Nosotros</Link></li>
                  <li><Link to={HOME_URL} class="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2" >FAQ</Link></li>
               </ul>
            </nav>
         </div>
         


         
         <div class="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4" id="nav-content">
            <div class="auth flex items-center w-full md:w-full">
               <Link to={LOGIN_URL} class="bg-white text-gray-800  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700">Iniciar sesion</Link>
               <Link to={REGISTER_URL} class="bg-blue-600 text-gray-200  p-2 rounded  hover:bg-blue-500 hover:text-gray-100">Registrarse</Link>
            </div>
         </div>
      </div>
   </nav>
  )
}
