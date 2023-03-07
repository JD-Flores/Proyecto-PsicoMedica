import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Routes,Route,BrowserRouter} from "react-router-dom"
import {HOME_URL, LOGIN_URL, PERFIL_CLIENTE, REGISTER_DOCTOR_URL, REGISTER_PATIENT_URL, REGISTER_URL } from './constantes/urls'
import { Layout } from './Componentes/Layout/Layout'
import {HomePage} from './Paginas/Home/HomePage'
import {RegisterPage} from './Paginas/register/RegisterPage'
import { LoginPage } from './Paginas/login/LoginPage'
import { RegisterDoctorPage } from './Paginas/registerDoctor/RegisterDoctorPage'
import {RegisterPatientPage} from './Paginas/registerPatient/RegisterPatientPage'
import ErrorPage from './Paginas/error/ErrorPage'
import { PerfilClientePage } from './Paginas/Perfil/PerfilClientePage'
import { PrivateRoute } from './Componentes/PrivateRoutes/PrivateRoute'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
        <Route path={HOME_URL} element={<HomePage/>}/>
        <Route path={REGISTER_URL} element={<RegisterPage/>}/>
        <Route path={LOGIN_URL} element={<LoginPage/>}/>
        <Route path={REGISTER_DOCTOR_URL} element={<RegisterDoctorPage/>}/>
        <Route path={REGISTER_PATIENT_URL} element={<RegisterPatientPage/>}/>
        <Route path={PERFIL_CLIENTE} element={<PrivateRoute><PerfilClientePage/></PrivateRoute>}/>
        <Route path="/*" element={<ErrorPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
