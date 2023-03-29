import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Routes,Route,BrowserRouter} from "react-router-dom"
import {BUSCAR_DOC, CHAT, HOME_URL, LOGIN_URL, PERFIL_CLIENTE, PERFIL_DOCTOR, REGISTER_DOCTOR_URL, REGISTER_PATIENT_URL, REGISTER_URL, RESERVAR_CITA,DOC_DETAIL, CHECKOUT, CALENDAR, CHATDOC, FEEDBACK, FAQ_URL } from './constantes/urls'
import { Layout } from './Componentes/Layout/Layout'
import {HomePage} from './Paginas/Home/HomePage'
import {RegisterPage} from './Paginas/register/RegisterPage'
import { LoginPage } from './Paginas/login/LoginPage'
import { RegisterDoctorPage } from './Paginas/registerDoctor/RegisterDoctorPage'
import {RegisterPatientPage} from './Paginas/registerPatient/RegisterPatientPage'
import ErrorPage from './Paginas/error/ErrorPage'
import { PerfilClientePage } from './Paginas/Perfil/PerfilClientePage'
import { PrivateRoute } from './Componentes/PrivateRoutes/PrivateRoute'
import { BuscarDoc } from './Paginas/buscarDoc/BuscarDoc'
import { ReservarCitaPage } from './Paginas/reservarCita/ReservarCitaPage'
import { Chat } from './Paginas/chat/Chat'
import { PerfilDoctorPage } from './Paginas/Perfil/PerfilDoctorPage'
import { PrivateRouteDoc } from './Componentes/PrivateRoutes/PrivateRouteDoc'
import { DoctorDetail } from './Paginas/doctorDetail/doctorDetail'
import { CheckoutPage } from './Paginas/checkout/CheckoutPage'
import { Feedback } from './Paginas/Feedback/Feedback'
import DoctorCalendarPage from './Paginas/DoctorCalendar/DoctorCalendarPage'
import {FAQ} from './Componentes/FAQ/FAQ'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
        <Route path={HOME_URL} element={<HomePage/>}/>
        <Route path={FAQ_URL} element={<FAQ/>}/>
        <Route path={REGISTER_URL} element={<RegisterPage/>}/>
        <Route path={LOGIN_URL} element={<LoginPage/>}/>
        <Route path={REGISTER_DOCTOR_URL} element={<RegisterDoctorPage/>}/>
        <Route path={REGISTER_PATIENT_URL} element={<RegisterPatientPage/>}/>
        <Route path={PERFIL_CLIENTE} element={<PrivateRoute><PerfilClientePage/></PrivateRoute>}/>
        <Route path={BUSCAR_DOC} element={<PrivateRoute><BuscarDoc/></PrivateRoute>}/>
        <Route path='/doctors/:doctor_id' element={<PrivateRoute><DoctorDetail/></PrivateRoute>}/>
        <Route path={DOC_DETAIL} element={<DoctorDetail/>}/>
        <Route path='/reservas/:doctor_id' element={<PrivateRoute><ReservarCitaPage/></PrivateRoute>}/>
        <Route path={CHAT} element={<PrivateRoute><Chat/></PrivateRoute>}/>
        <Route path='/checkout/:doctor_id' element={<PrivateRoute><CheckoutPage/></PrivateRoute>}/>
        {/* Paginas de doctor */}
        <Route path={PERFIL_DOCTOR} element={<PrivateRouteDoc><PerfilDoctorPage/></PrivateRouteDoc>}/>
        <Route path={CALENDAR} element={<PrivateRouteDoc><DoctorCalendarPage/></PrivateRouteDoc>}/>
        <Route path={CHATDOC} element={<PrivateRouteDoc><Chat/></PrivateRouteDoc>}/>
        <Route path={FEEDBACK} element={<PrivateRouteDoc><Feedback/></PrivateRouteDoc>}/>
        {/* TODO CAMBIAR A PRIVADO */}
        <Route path="/*" element={<ErrorPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
