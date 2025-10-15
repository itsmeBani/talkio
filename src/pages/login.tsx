import { LoginForm } from "@/feature/auth/login-form.tsx";
import Model3D from "@/components/model3D";
import {Origami} from "lucide-react";


function Login() {
    return (
        <div className="grid w-full min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 text-blue-500 font-medium">
                        <Origami className="text-blue-500"/>
                        WeTalk
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="bg-background relative hidden lg:block">
             <Model3D/>
            </div>
        </div>
    );
}

export default Login;