import { cn } from "@/lib/utils.ts";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import useAuth from "@/context/authProvider.tsx";

function RegisterForm() {
    const { registerForm, registerWithEmail } = useAuth();

    return (
        <div className={cn("flex w-full flex-col gap-6")}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your details below to create your account
                </p>
            </div>

            <div className="grid gap-6">
                <div>
                    <Form {...registerForm}>
                        <form
                            onSubmit={registerForm.handleSubmit(registerWithEmail)}
                            className="space-y-4"
                        >
                            <FormField
                                control={registerForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage className="barlow-regular text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={registerForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage className="barlow-regular text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={registerForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={registerForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button className="w-full dark:text-white py-3" type="submit">
                                Register
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>

            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to={"/auth/login"} className="underline underline-offset-4">
                    Sign in
                </Link>
            </div>
        </div>
    );
}

export default RegisterForm;
