import Loader from "@/components/Loader";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children}) => {
    
    const {isLoading,isAuthenticated}=useSelector(state=>state.user);

   
    if(isLoading){
        return <Loader/>
    }

    if(!isAuthenticated){
        return <Navigate to="/"/>
    }

    return children;
}

export default ProtectedRoute
