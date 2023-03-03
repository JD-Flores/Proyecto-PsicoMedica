import React,{useContext,createContext,useEffect,useState} from "react";
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "../firebase/config"
// import { profile } from "console";
import { getUserProfile } from "../firebase/users-service";
export const UserContext = createContext(null);

export function UserContextProvider({ children }){
const [user,setUser] =useState(null)
const [isLoading,setIsLoading] = useState(true)

useEffect(()=>{
    onAuthStateChanged(auth,async (firebaseUser)=>{
        setIsLoading(true)
        if(firebaseUser){
            const profile = await getUserProfile(firebaseUser.email)
            setUser(profile);
        }else{
           setUser(null); 
        }
        setIsLoading(false)
    });
},[]);

    return( <UserContext.Provider 
    value={{
        user,
        isLoading,
    }}>
        {children}
    </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext);
}