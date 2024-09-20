import Loader from "@/components/Loader";

import { useSelector } from "react-redux";
import { Navigate, useLocation, } from "react-router-dom";


const ProtectedRoute = ({children,isAdmin}) => {
    
    const location=useLocation();
    const {isLoading,isAuthenticated,user}=useSelector(state=>state.user);

    if(isLoading){
        return <Loader/>
    }

    if(!isAuthenticated){
        return <Navigate to={`/login?redirect=${location.pathname.substring(1)}`}/>
    }

    if(isAdmin && user.role!=='admin'){
        return <Navigate to="/"/>
    }

    return children;
}

export default ProtectedRoute
