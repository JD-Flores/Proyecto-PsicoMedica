import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Routes,Route,BrowserRouter} from "react-router-dom"
import {HOME_URL, LOGIN_URL, REGISTER_DOCTOR_URL, REGISTER_PATIENT_URL, REGISTER_URL } from './constantes/urls'
import {HomePage} from './Paginas/Home/HomePage'
import {RegisterPage} from './Paginas/register/RegisterPage'
import { LoginPage } from './Paginas/login/LoginPage'
import { RegisterDoctorPage } from './Paginas/registerDoctor/RegisterDoctorPage'
import {RegisterPatientPage} from './Paginas/registerPatient/RegisterPatientPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={HOME_URL} element={<HomePage/>}/>
        <Route path={REGISTER_URL} element={<RegisterPage/>}/>
        <Route path={LOGIN_URL} element={<LoginPage/>}/>
        <Route path={REGISTER_DOCTOR_URL} element={<RegisterDoctorPage/>}/>
        <Route path={REGISTER_PATIENT_URL} element={<RegisterPatientPage/>}/>
        <Route path="/*" element={<h1>404 Error not found</h1>}/>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
