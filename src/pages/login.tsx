

import {Origami} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {BackgroundGradient} from "@/components/ui/shadcn-io/background-gradient";
import heroImageDark from "../assets/heroimageDark.png"
import heroImageLight from "../assets/heroImageLight.png"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import {LoginForm} from "@/feature/auth/login-form.tsx";
function Login() {

    return (
        <section className="w-full h-full flex flex-col ">
                <div className="flex justify-center p-5 gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 text-blue-500 font-medium">
                        <Origami className="text-blue-500"/>
                        WeTalk
                    </a>
                </div>
            <div className="flex flex-col items-center h-full justify-end   text-center    px-6">
             <div className="flex flex-col z-50 items-center">
                 <h1 className="text-4xl  Aeonik-bold  md:text-6xl font-bold  mb-4">
                     Stay Connected Instantly with <span className="Aeonik-bold text-primary">Talkio</span>
                 </h1>
                 <p className="text-lg  md:text-xl text-foreground/80 Aeonik-regular  max-w-2xl mb-8">
                     Talkio brings people closer through fast, secure, and real-time messaging.
                     Chat, share, and collaborate — all in one seamless experience.
                 </p>
                 <div className="flex  gap-4">
                     <Sheet >
                         <SheetTrigger>   <Button  className={"Aeonik-medium text-white text-md"}>Start Chatting Now</Button></SheetTrigger>
                         <SheetContent   className="min-w-full lg:min-w-md px-5 flex place-items-center justify-center">
                           <LoginForm/>
                         </SheetContent>
                     </Sheet>

                     <Button disabled={true} variant={"outline"} className={"Aeonik-medium text-md border-foreground"}>Download App</Button>

                 </div>
                 <p className="mt-6  pb-10 Aeonik-regular text-sm text-foreground/80 ">
                     Connect instantly. Anytime. Anywhere.
                 </p>
             </div>
                <div className="w-full flex place-items-center   justify-center">
                    <div className={"max-w-3xl w-full max-h-[400px] "}>
                        <BackgroundGradient className=" rounded-[22px] rounded-b-none  w-wull p-3 overflow-hidden  bg-white dark:bg-zinc-900">


                            <img
                               src={heroImageLight}
                                alt="Logo Light"
                                className="block dark:hidden "
                            />
                            <img
                               src={heroImageDark}
                                alt="Logo Dark"
                                className="hidden dark:block "
                            />
                        </BackgroundGradient>

                    </div>
                </div>
            </div>




            <div className="absolute inset-0 z-20 bg-gradient-to-t dark:from-background/80 dark:to-bg-background/90  from-background/30 to-bg-background/90 pointer-events-none" />

        </section>
    );
}

export default Login;