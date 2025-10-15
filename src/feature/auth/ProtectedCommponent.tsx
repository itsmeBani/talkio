import {type ReactNode,} from 'react';
import {Navigate} from "react-router-dom";
import useAuth from "@/context/authProvider.tsx";



interface ProtectedComponentProps {
    children: ReactNode;
}


function ProtectedComponent({ children }: ProtectedComponentProps) {
    const {currentUser}=useAuth()
    if (currentUser === undefined) return <p>loading</p>

    if (currentUser === null) return <Navigate to="/login" replace />;

    if (currentUser)  return children
}

export default ProtectedComponent;