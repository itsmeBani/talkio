import Layout from "./pages/__layout"

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MessagePage from "./pages/message";
import Settings from "./pages/settings";
import Feed from "@/pages/feed.tsx";

import ProtectedCommponent from "@/feature/auth/ProtectedCommponent.tsx";
import PublicComponent from "./feature/auth/PublicComponent";
import Hero from "@/pages/hero.tsx";
import {LoginForm} from "@/feature/auth/login-form.tsx";
import RegisterForm from "@/feature/auth/register-form.tsx";
import Profile from "@/pages/Profile.tsx";
import UserMessages from "@/feature/message/user_messages.tsx";


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
                    path: "profile", element: <Profile/>
                },
                {
                    path: "feed", element: <Feed/>
                }
            ],
        },
        {
          path: "auth",
          element:<PublicComponent> <Hero/></PublicComponent>,
          children:[
              {
                  path: "login",
                  element: <LoginForm/>

              },
              {
                  path: "register",
                  element: <RegisterForm/>

              }
          ]
        },

    ]);


    return (
        <section className=" overflow-hidden h-[100dvh] flex w-full">

            <RouterProvider router={router}/>
        </section>
    )
}

export default App
