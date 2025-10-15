

import {Users} from "@/feature/Users.tsx";

import {Outlet, useNavigate, useParams} from "react-router-dom";
import {isUserExist} from "@/utils/CheckExisting.ts";
import {useEffect} from "react";

function MessagePage() {
    const {userID}=useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const isValidUserID=async ()=>{
            if (userID){
                const exist=await isUserExist(userID)
                if (!exist)  navigate("/");
            }
        }
        isValidUserID().then()
    }, [navigate, userID]);

    return (
        <div className="flex     w-full  h-full   ">

            <div className="lg:min-w-[350px] h-full   overflow-y-auto">
                <Users/>
            </div>



               <Outlet/>



        </div>


    );
}

export default MessagePage;