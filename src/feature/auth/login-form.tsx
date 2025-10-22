import { cn } from "@/lib/utils.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx"
import useAuth from "@/context/authProvider.tsx";

export function LoginForm() {
const {loginForm,loginWithEmail,loginWithFacebook}=useAuth()

  return (
    <div className={cn("flex w-full flex-col gap-6")} >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
          <div>
              <Form  {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(loginWithEmail)} className="space-y-4">
                      <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel >Email</FormLabel>
                                  <FormControl>
                                      <Input placeholder="example@gmail.com" {...field} />
                                  </FormControl>
                                  <FormMessage className="barlow-regular text-xs" />
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Password</FormLabel>
                                  <FormControl>
                                      <Input placeholder="********" {...field} />
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                      <Button className="w-full dark:text-white py-3" type="submit">Sign in</Button>
                  </form>
              </Form>
          </div>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

          <Button onClick={loginWithFacebook}  variant="outline" className="dark:text-white hover:border-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    strokeWidth="2"  strokeLinecap="round" strokeLinejoin="round"
                   className="lucid fill-blue-500 stroke-blue-500   lucide-facebook-icon lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              Login with Facebook
          </Button>
      </div>
        <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4">
                Sign up
            </a>
        </div>
    </div>
  )
}
