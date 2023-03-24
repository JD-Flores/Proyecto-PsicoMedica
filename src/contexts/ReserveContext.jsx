import React,{useContext,createContext,useEffect,useState} from "react";

export const reserveContext = createContext();

export function ReserveContext({ children }){
    const [context, setContext] =useState(null)
    
    
        return( <reserveContext.Provider 
        value={
            [context,
            setContext]
        }>
            {children}
        </reserveContext.Provider>
        )
    }