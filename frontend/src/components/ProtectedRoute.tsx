import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
interface Props {
    isAuthenticated:boolean,
    children?:ReactElement,
    adminRoute?:boolean,
    redirect?:string,
    isAdmin?:boolean

}


const ProctedRoute = ({isAuthenticated,children,adminRoute,isAdmin,redirect='/'}:Props)=>{
        if(!isAuthenticated)return <Navigate to={redirect} />

        if(adminRoute && !isAdmin){
    return <Navigate to={redirect} />
}

    return (children?children:<Outlet />)
}


export default ProctedRoute