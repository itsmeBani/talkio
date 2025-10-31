

import {Users} from "@/feature/users/Users.tsx";

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
                if (!exist) navigate("/")
            }
        }
        isValidUserID().then()
    }, [navigate, userID]);


    const style=userID ? "show-messages" : "show-user"
    return (
        <div className={`flex  group    w-full  h-full  ${style} `}>

            <div className="min-w-full lg:min-w-[350px] h-full group-[.show-messages]:hidden lg:group-[.show-messages]:flex   overflow-y-auto">
                <Users/>
            </div>



               <div className="w-full h-full group-[.show-user]:hidden lg:group-[.show-user]:flex ">
                   <Outlet/>
               </div>



        </div>


    );
}

export default MessagePage;