import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm, type UseFormReturn} from "react-hook-form"
import {z} from "zod"
import {supabase} from "@/lib/supabase";
import type {CurrentUser, Users} from "@/types/Users.ts";
import {toast} from "sonner";
import {isUserExist} from "@/utils/CheckExisting.ts";


interface AuthContextProps {
    loginWithEmail: (values: z.infer<typeof loginFormSchema>) => Promise<void>
    loginForm: UseFormReturn<{ email: string, password: string }>
    loginWithFacebook: () => void
    currentUser: CurrentUser | null | undefined,
    logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)


const loginFormSchema = z.object({
    email: z.email(),
    password: z.string()
})

export const AuthProvider = ({children}: { children: ReactNode }) => {


    const [currentUser, setCurrentUser] = useState<Users | null | undefined>(undefined)

    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })


    useEffect(() => {
        const {data: {subscription}} = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'INITIAL_SESSION') {
                    if (!session) {
                        setCurrentUser(null)
                    }else {
                        getCurrentUser().then()
                    }
                } else if (event === 'SIGNED_IN') {
                    if (session) {
                            isUserExist(session.user?.id).then((isExist) => {
                                if (!isExist) {
                                     if (session?.user?.app_metadata.provider === "facebook"){
                                         const user_data: Users = {
                                             avatar_url: session?.user?.user_metadata?.avatar_url,
                                             email:session?.user?.user_metadata?.email,
                                             full_name: session?.user?.user_metadata?.full_name,
                                             id: session?.user?.id,
                                         }
                                         createUser(user_data).then()
                                     }
                                }
                                getCurrentUser().then()
                            })
                    }

                }

            })

        return () => {
            subscription.unsubscribe()
        }

    }, [])


    const loginWithEmail = async ({email, password}: z.infer<typeof loginFormSchema>) => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) toast.error(error.message)
        if (data?.user) {
            const isExist = await isUserExist(data?.user?.id)
            if (!isExist) {
                const user_data: Users = {
                    avatar_url: "",
                    email: data.user.email || "",
                    full_name: "Unknown",
                    id: data?.user?.id,
                }
                await createUser(user_data)
            }
        }
    }


    const logout = async () => {
        const {error} = await supabase.auth.signOut({scope: "local"})
        if (error) return toast.error("Something Went Wrong")
        setCurrentUser(null)
        toast.success("Logout Successfully")
    }


    async function loginWithFacebook() {

        await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: {


                redirectTo: ` https://talkio-xd2v-a13mtwgwz-jiovani-a-fabros-projects.vercel.app/`,
                // redirectTo: `http://localhost:5173/login`,
            },
        })


    }




    const createUser = async (user_data: Users) => {
        const {error} = await supabase
            .from('users')
            .insert(user_data)
            .select()

        if (error) toast.error("Something Went Wrong")
    }


    const getCurrentUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
       if (user?.id){
           const {data} = await supabase
               .from("users")
               .select("*")
               .eq("id", user?.id)
               .single();

           setCurrentUser(data)
       }
    }

    return (
        <AuthContext.Provider value={{loginWithEmail, loginForm, loginWithFacebook, currentUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) throw new Error("useContext must use inside the AuthProvoder")
    return context

}
// eslint-disable-next-line react-refresh/only-export-components
export default useAuth


