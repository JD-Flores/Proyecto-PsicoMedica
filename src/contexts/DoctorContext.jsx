import React,{useContext,createContext,useEffect,useState} from "react";
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "../firebase/config"
import { getDoctorById, getUserProfile } from "../firebase/users-service";
export const docContext = createContext();


export function DoctorContext({ children }){
const [doctorContext,setDoctorcontext] =useState(null)
const [isLoading,setIsLoading] = useState(true)


// useEffect(()=>{
    
//     // setDoctor(getDoctorById(uid));
//     // console.log(doctor);
//         // setDoctor(doctor2)
//         // console.log(doctor)
//     // onAuthStateChanged(auth,async (firebaseUser)=>{
//     //     setIsLoading(true)
//     //     if(firebaseUser){
//     //         const profile = await getUserProfile(firebaseUser.email)
//     //         setUser(profile);
//     //     }else{
//     //        setUser(null); 
//     //     }
//     //     setIsLoading(false)
//     // });
// },[defineDoctorContext]);

 

    return( <docContext.Provider 
    value={
        {doctorContext,
        setDoctorcontext}
    }>
        {children}
    </docContext.Provider>
    )
}

export function useDoc(){
    return useContext(DoctorContext);
}