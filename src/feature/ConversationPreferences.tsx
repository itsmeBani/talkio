import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Bolt, ChevronLeft, FolderOpen, Settings, User} from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer.tsx"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import ConversationFilesViewer from "@/feature/ConversationSettings/ConversationFilesViewer.tsx";
import {useQueries} from "@tanstack/react-query";
import {fetchConversationFiles} from "@/query/fetchFiles.ts";
import ManageConversation from "@/feature/ConversationSettings/ManageConversation.tsx";
import {buttonVariants} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {cn} from "@/lib/utils.ts";
import type {IConversation} from "@/types/Conversation.ts";
import useAuth from "@/context/authProvider.tsx";


interface ConversationPreferencesProps {

    conversation: IConversation | null | undefined
}

function ConversationPreferences({conversation}: ConversationPreferencesProps) {


    const results = useQueries({
        queries: [
            fetchConversationFiles(conversation?.id),
        ]
    })
    const [files] = results
    const {currentUser}=useAuth()

    const recipient= currentUser?.id === conversation?.user_one.id ? conversation?.user_two : conversation?.user_one

    return (
        <div
            className=" flex  w-full p-4 py-3     bg-background ">
            <div className="flex place-items-center w-full justify-between">


                <div className="flex gap-3 place-items-center ">
                    <Link className={cn(buttonVariants({variant: "outline",size: "icon"}),"lg:hidden flex")} to={"/"} ><ChevronLeft/></Link>
                    <Avatar className="h-10 w-10 rounded-lg">
                        <AvatarImage src={recipient?.avatar_url ?? ""} alt={""}/>
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="leading-5">
                        <h1 className="CircularFont">{recipient?.full_name}</h1>
                        <p className="text-xs">Online</p>
                    </div>

                    {/*<div className="flex items-center gap-3">*/}
                    {/*    /!* Avatar Skeleton *!/*/}
                    {/*    <div className="h-10 w-10 rounded-lg bg-gray-300 animate-pulse"></div>*/}

                    {/*    /!* Text Skeleton *!/*/}
                    {/*    <div className="flex flex-col gap-1 w-32">*/}
                    {/*        <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>*/}
                    {/*        <div className="h-3 w-1/2 bg-gray-300 rounded animate-pulse"></div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                <div>

                    <Drawer direction={"right"}>
                        <DrawerTrigger> <Bolt size={18}/></DrawerTrigger>
                        <DrawerContent className="flex gap-10 z-[999] flex-col overflow-x-hidden overflow-y-auto">
                            <DrawerHeader>
                                <DrawerTitle className={"text-center"}>Conversation Settings</DrawerTitle>
                                <DrawerDescription className={"text-center PlusJakartaSans-Regular "}>Adjust your chat
                                    settings to personalize
                                    your experience.</DrawerDescription>

                            </DrawerHeader>
                            <div className="flex justify-center-safe w-full  h-100">


                                <div className="relative w-50 p-1 h-50 ">

                                    <div
                                        className="w-full   border-background border-[10px] overflow-hidden h-full bg-secondary border rounded-full translate-y-1/8 translate-x-1/3 absolute top-0 left-0">

                                        <Avatar className="w-full h-full rounded-full">
                                            <AvatarImage src={""} alt={""}/>
                                            <AvatarFallback
                                                className="rounded-lg  PlusJakartaSans-Bold text-2xl">CN</AvatarFallback>

                                        </Avatar>
                                    </div>
                                    <div
                                        className="w-full  border-background border-[10px] overflow-hidden h-full bg-secondary rounded-full  -translate-y-1/8 -translate-x-1/3 border absolute top-0 left-0">

                                        <Avatar className="w-full h-full rounded-full">
                                            <AvatarImage src={"https://github.com/shadcn.png"} alt={""}/>
                                            <AvatarFallback
                                                className="rounded-lg PlusJakartaSans-Bold text-2xl">CN</AvatarFallback>

                                        </Avatar>
                                    </div>
                                </div>
                            </div>

                            <div className="flex p-4 w-full h-full   justify-center gap-3  ">
                                <div className="w-full  h-full">

                                    <Tabs defaultValue="files" className="w-full gap-2  flex  place-items-center">
                                        <TabsList className={""}>
                                            <TabsTrigger value="files"><FolderOpen/></TabsTrigger>
                                            <TabsTrigger value="settings"><Settings/></TabsTrigger>
                                            <TabsTrigger value="user"><User/></TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="files">
                                            <ConversationFilesViewer files={files?.data}/>
                                        </TabsContent>
                                        <TabsContent value="settings"> <ManageConversation/></TabsContent>
                                        <TabsContent value="user"> s</TabsContent>


                                    </Tabs>
                                </div>

                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </div>
    );
}

export default ConversationPreferences;