import { Navigate } from "react-router";
import { LOGIN_URL, PERFIL_CLIENTE } from "../../constantes/urls";
import { useUser } from "../../contexts/UserContext";

export function PrivateRouteDoc({children}){
    const {user,isLoading}=useUser();

    if(isLoading){
        return<h1>LOADING USER...</h1>;
    }

    if(!isLoading && !user){
        return <Navigate to={LOGIN_URL}/>;
    }
    if(user && user.doctor==false){
        return <Navigate to={PERFIL_CLIENTE}/>
    }

    return children;
}