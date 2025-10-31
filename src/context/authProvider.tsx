import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm, type UseFormReturn} from "react-hook-form"
import {z} from "zod"
import {supabase} from "@/lib/supabase";
import type {CurrentUser, Users} from "@/types/Users.ts";
import {toast} from "sonner";
import {isUserExist} from "@/utils/CheckExisting.ts";
import {loginFormSchema} from "@/form-schemas/login.ts";
import {registerFormSchema} from "@/form-schemas/register.ts";


interface AuthContextProps {
    loginWithEmail: (values: z.infer<typeof loginFormSchema>) => Promise<void>
    loginForm: UseFormReturn<{ email: string, password: string }>
    registerForm: UseFormReturn<{ name: string, email: string, password: string, confirmPassword: string }>
    loginWithFacebook: () => void
    registerWithEmail: (values: z.infer<typeof registerFormSchema>) => Promise<void>
    currentUser: CurrentUser | null | undefined,
    logout: () => void
    loginWithGoogle:()=>void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)


export const AuthProvider = ({children}: { children: ReactNode }) => {


    const [currentUser, setCurrentUser] = useState<Users | null | undefined>(undefined)

    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const registerForm = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    useEffect(() => {
        const {data: {subscription}} = supabase.auth.onAuthStateChange(
            (event, session) => {

                if (event === 'INITIAL_SESSION') {
                    if (!session) {
                        setCurrentUser(null)
                    } else {
                        getCurrentUser().then()
                    }
                } else if (event === 'SIGNED_IN') {
                    if (session) {
                        if (session?.user?.app_metadata.provider === "google") {
                            console.log(session)
                            isUserExist(session.user?.id).then((isExist) => {
                                if (!isExist) {
                                    const user_data: Users = {
                                        avatar_url: session?.user?.user_metadata?.avatar_url,
                                        email: session?.user?.user_metadata?.email,
                                        full_name: session?.user?.user_metadata?.full_name,
                                        id: session?.user?.id,
                                    }
                                    createUser(user_data).then(() => {
                                        getCurrentUser().then()
                                    })

                                }
                                getCurrentUser().then()
                            })
                        }
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
            getCurrentUser().then()
        }
    }


    const logout = async () => {
        const {error} = await supabase.auth.signOut({scope: "local"})

        setCurrentUser(null)
        if (error) return toast.error("Something Went Wrong")
        toast.success("Logout Successfully")
    }


    async function loginWithFacebook() {

        await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: {


                //redirectTo: `https://talkio-xd2v.vercel.app/`,
                redirectTo: `http://localhost:5173/auth/`,
            },
        })


    }
    async  function loginWithGoogle (){

        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `https://talkio-xd2v.vercel.app/auth/`,
                //redirectTo: `http://localhost:5173/auth/`,
            },
        })

    }

    async function registerWithEmail({name, email, password}: z.infer<typeof registerFormSchema>) {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            toast.error(error.message)
        }


        if (data?.user?.id) {

            const user = await createUser({

                email: email,
                full_name: name,
                id: data?.user.id,
            })

            if (user) {
                registerForm.reset()
                toast.success("Successfully Register")
            }


        }


    }


    const createUser = async (user_data: Users) => {
        const {data, error} = await supabase
            .from('users')
            .insert(user_data)
            .select()

        if (error) toast.error("Something Went Wrong")
        setCurrentUser(null)
        if (data) return data
    }


    const getCurrentUser = async () => {
        const {data: {user}} = await supabase.auth.getUser()
        if (user?.id) {
            const {data} = await supabase
                .from("users")
                .select("*")
                .eq("id", user?.id)
                .single();

            setCurrentUser(data)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                loginWithEmail,
                loginForm,
                loginWithFacebook,
                currentUser,
                logout,
                registerForm,
                registerWithEmail,
                loginWithGoogle
            }}>
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


