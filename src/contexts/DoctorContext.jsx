import React,{useContext,createContext,useEffect,useState} from "react";

export const docContext = createContext();


export function DoctorContext({ children }){
const [context, setContext] =useState(null)


    return( <docContext.Provider 
    value={
        [context,
        setContext]
    }>
        {children}
    </docContext.Provider>
    )
}

