import Loader from "@/components/Loader";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children,isAdmin}) => {
    
    console.log(isAdmin);
    const {isLoading,isAuthenticated,user}=useSelector(state=>state.user);

   
    if(isLoading===true){
        return <Loader/>
    }

    if(isAuthenticated===false){
        return <Navigate to="/"/>
    }

    if(isAdmin===true && user.role!=='admin'){
        return <Navigate to="/"/>
    }

    return children;
}

export default ProtectedRoute
