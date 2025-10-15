import Layout from "./pages/__layout"
import Login from "@/pages/login.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MessagePage from "./pages/message";
import Settings from "./pages/settings";
import Feed from "@/pages/feed.tsx";
import UserMessages from "@/feature/userMessages.tsx";
import ProtectedCommponent from "@/feature/auth/ProtectedCommponent.tsx";
import PublicComponent from "./feature/auth/PublicComponent";


function App() {


    const router = createBrowserRouter([
        {
            path: "/",
            element: <ProtectedCommponent><Layout/></ProtectedCommponent>,
            children: [
                {
                    path: "",
                    element: <MessagePage/>,
                    children: [{
                        path: "message/:userID",
                        element: <UserMessages/>
                    }]
                },
                {
                    path: "settings", element: <Settings/>
                },
                {
                    path: "feed", element: <Feed/>
                }
            ],
        },
        {
          path: "/login",
          element:<PublicComponent> <Login/></PublicComponent>
        },

    ]);


    return (
        <section className=" overflow-hidden h-[100dvh] flex w-full">

            <RouterProvider router={router}/>
        </section>
    )
}

export default App
