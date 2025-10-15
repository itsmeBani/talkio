import {type ReactNode,} from 'react';
import {Navigate} from "react-router-dom";
import useAuth from "@/context/authProvider.tsx";



interface ProtectedComponentProps {
    children: ReactNode;
}


function PublicComponent({ children }: ProtectedComponentProps) {
    const {currentUser}=useAuth()

    if (currentUser === undefined) return <p>loading</p>
    if (currentUser) return <Navigate to="/" replace />;
    if (currentUser === null)  return children
}

export default PublicComponent;