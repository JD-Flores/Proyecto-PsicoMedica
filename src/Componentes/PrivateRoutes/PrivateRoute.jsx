import { Navigate } from "react-router";
import { LOGIN_URL, PERFIL_DOCTOR } from "../../constantes/urls";
import { useUser } from "../../contexts/UserContext";

export function PrivateRoute({children}){
    const {user,isLoading}=useUser();

    if(isLoading){
        return<h1>LOADING USER...</h1>;
    }

    if(!isLoading && !user){
        return <Navigate to={LOGIN_URL}/>;
    }
    if(user && user.doctor==true){
        return <Navigate to={PERFIL_DOCTOR}/>
    }


    return children;
}