import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Bolt, FolderOpen, Settings, User} from "lucide-react";
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
import {useQueries, useQuery} from "@tanstack/react-query";
import {fetchConversationFiles} from "@/query/fetchFiles.ts";
import ManageConversation from "@/feature/ConversationSettings/ManageConversation.tsx";


interface ConversationPreferencesProps {
    conversationId: string | undefined
}

function ConversationPreferences({conversationId}: ConversationPreferencesProps) {


    const results = useQueries({
        queries: [
            fetchConversationFiles(conversationId),
        ]
    })
    const [files] = results


    return (
        <div
            className=" flex  w-full p-4 py-3     bg-background ">
            <div className="flex place-items-center w-full justify-between">

                <div className="flex gap-3 ">
                    <Avatar className="h-10 w-10 rounded-lg">
                        <AvatarImage src={""} alt={""}/>
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>

                    </Avatar>
                    <div className="leading-5">
                        <h1 className="CircularFont">Jiovani Fbaro</h1>
                        <p className="text-xs">Online</p>

                    </div>
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