import Sidebar from "@/feature/sidebar.tsx";

import {Outlet} from "react-router-dom";


function Layout() {

    return (
        <div className="flex  lg:flex-row  flex-col-reverse h-full w-full">
          <Sidebar/>
            <div className="flex w-full  h-full ">
             <Outlet/>
            </div>
        </div>
    );
}

export default Layout;