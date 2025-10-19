import {type ReactNode,} from 'react';
import {Navigate} from "react-router-dom";
import useAuth from "@/context/authProvider.tsx";
import ScreenLoader from "@/components/loader/screen-loader.tsx";



interface ProtectedComponentProps {
    children: ReactNode;
}


function PublicComponent({ children }: ProtectedComponentProps) {
    const {currentUser}=useAuth()

    if (currentUser === undefined) return <ScreenLoader/>
    if (currentUser) return <Navigate to="/" replace />;
    if (currentUser === null)  return children
}

export default PublicComponent;