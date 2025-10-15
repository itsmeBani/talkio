import {
    Bell,
    CreditCard,
    LogOut,
    Sparkles, Sun,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useTheme} from "@/context/themeProvider.tsx";
import {Switch} from "@/components/ui/switch";
import * as React from "react";
import useAuth from "@/context/authProvider.tsx";


export function NavUser() {

    const {setTheme,theme} = useTheme()
    const {logout,currentUser}=useAuth()

    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
       if (theme === "dark"){
           setTheme("light")
       }else {
           setTheme("dark")
       }
    }
    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={currentUser?.avatar_url || ""} alt={currentUser?.full_name || ""}/>
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>


                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={"right"}
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={currentUser?.avatar_url || ""} alt={currentUser?.full_name || ""}/>
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{currentUser?.full_name || ""}</span>
                            <span className="truncate text-xs">{currentUser?.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Sparkles/>
                        Upgrade to Pro
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>

                    <DropdownMenuItem className="flex justify-between">
                      <div className="flex place-items-center gap-2"> <Sun/>Dark Mode</div>
                        <Switch onClick={(e)=>toggleTheme(e)} checked={theme === "dark"}/>
                    </DropdownMenuItem>


                    <DropdownMenuItem>
                        <CreditCard/>
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Bell/>
                        Notifications
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem variant={"destructive"} onClick={logout}>
                    <LogOut/>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
