import { async } from '@firebase/util';
import React from 'react'
import { Link } from "react-router-dom";
import { HOME_URL, LOGIN_URL, PERFIL_CLIENTE, REGISTER_URL } from '../../constantes/urls';
import { useUser } from '../../contexts/UserContext';
import { logout } from '../../firebase/auth-service';
// import { HOME_URL } from '../../constantes/urls';


export function Navbar() {
   const{user}=useUser();
   const handleLogout = async ()=>{
      await logout()
   }
  return (
    <nav id="header" className="w-full z-30 top-10 py-1 border-slate-500 bg-[#5974A9] font-comfortaa text-[14px]">
      <div className="w-full flex items-center justify-between mt-0 px-6 py-2">
      <div className="group md:hidden block">
            <button
                className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32"
            >
                <span className="pr-1 font-semibold flex-1">Menu</span>
                <span>
                <svg
                    className="fill-current h-4 w-4 transform group-hover:-rotate-180
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
                className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
            transition duration-150 ease-in-out origin-top min-w-32"
            >
                <li  className="rounded-sm px-3 py-1 hover:bg-gray-100"><Link to={HOME_URL}>Inicio</Link></li>
                <li className="rounded-sm px-3 py-1 hover:bg-gray-100"><Link to={HOME_URL}>Nosotros</Link></li>
                <li className="rounded-sm px-3 py-1 hover:bg-gray-100"><Link to={HOME_URL}>FAQ</Link></li>
            </ul>
            </div>
         <div className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1 overflow-y-auto " id="menu">
            <nav>
               <ul className="md:flex items-center justify-between text-base text-white font-bold pt-4 md:pt-0">
                  <li><Link to={HOME_URL} className="inline-block no-underline hover:text-black text-lg py-2 px-4 lg:-ml-2" >Inicio</Link></li>
                  <li><Link to={HOME_URL} className="inline-block no-underline hover:text-black text-lg py-2 px-4 lg:-ml-2" >Nosotros</Link></li>
                  <li><Link to={HOME_URL} className="inline-block no-underline hover:text-black text-lg py-2 px-4 lg:-ml-2" >FAQ</Link></li>
               </ul>
            </nav>
         </div>
         {user&&(
           <div className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4" id="nav-content">
           <div className="auth flex items-center w-full md:w-full">
              <Link to={PERFIL_CLIENTE} className="bg-white text-gray-800  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700">Mi perfil</Link>
              <button onClick={handleLogout} className="bg-blue-600 text-gray-200  p-2 rounded  hover:bg-blue-500 hover:text-gray-100">Logout</button>
           </div>
        </div> 
         )}


         {!user &&(<>
         <div className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4" id="nav-content">
            <div className="auth flex items-center w-full md:w-full">
               <Link to={LOGIN_URL} className="bg-white text-gray-800  p-2 rounded-[6px] border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700 font-bold">Iniciar sesión</Link>
               <Link to={REGISTER_URL} className="bg-blue-600 text-gray-200  p-2 rounded-[6px] hover:bg-blue-500 hover:text-gray-100 font-bold">Registrarse</Link>
            </div>
         </div>
         </>)}
      </div>
   </nav>
  )
}
