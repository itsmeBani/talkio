import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {useTheme} from "@/context/themeProvider.tsx";

function Personal() {
    const {setTheme,theme} = useTheme()

    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (theme === "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }
    return (
        <section>
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and profile information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">User Name</Label>
                            <Input id="firstName" defaultValue="John" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="jobTitle">Job Title</Label>
                            <Input id="jobTitle" defaultValue="Senior Product Designer" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input id="company" defaultValue="Acme Inc." />
                        </div>
                    </div>


                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <Label className="text-base">Dark Theme</Label>
                            <p className="text-muted-foreground text-sm">
                                Switch between light and dark mode
                            </p>
                        </div>

                        <Switch onClick={(e)=>toggleTheme(e)} checked={theme === "dark"}/>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}

export default Personal;