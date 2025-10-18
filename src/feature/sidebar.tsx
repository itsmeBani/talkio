import { NavUser } from "@/components/nav-user";
import { MessageSquareMore, Settings2, GalleryVerticalEnd ,Origami,UserPlusIcon} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {

    const ACTIVE_CLASSNAME = "lg:p-4 px-3 py-3 lg:w-full justify-center place-items-center   relative text-blue-500 after:bg-blue-500 after:h-1.5 after:rounded-full after:w-1.5 after:-bottom-0 after:left-1/2 after:-translate-x-1/2 after:absolute";
    const INACTIVE_CLASSNAME = "lg:p-4 px-3 py-3 lg:w-full dark:text-white justify-center place-items-center  text-gray-500";

    const SidebarStyle = ({ isActive } :{isActive:boolean}) =>
        isActive ? ACTIVE_CLASSNAME : INACTIVE_CLASSNAME;

    return (
        <div className="flex lg:w-20 shadow-md dark:bg-[#191919]  z-1 lg:flex-col place-items-center justify-between  lg:py-4 px-3 pb-3 lg:pb-5 pt-1 lg:p-2">
            <div>

                <Origami className={"text-blue-500"} strokeWidth={2}/>
            </div>

            <div className="flex lg:flex-col  w-full  gap-1 place-items-center justify-center">
                <NavLink to="/" className={SidebarStyle}>
                    <MessageSquareMore strokeWidth={2.3} />
                </NavLink>
                <NavLink to="/feed" className={SidebarStyle}>
                    <GalleryVerticalEnd strokeWidth={2.3} />
                </NavLink>
                <NavLink to="/settings" className={SidebarStyle}>
                    <UserPlusIcon strokeWidth={2.3} />
                </NavLink>
                <NavLink to="/settings" className={SidebarStyle}>
                    <Settings2 strokeWidth={2.3} />
                </NavLink>

            </div>

            <NavUser />
        </div>
    );
}

export default Sidebar;
