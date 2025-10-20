import type {ReactNode} from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar';
import {cn} from '@/lib/utils';

import type {ComponentProps, HTMLAttributes} from 'react';

import {EllipsisVertical, FileText, Reply, SmilePlus} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import type { Reaction } from "@/types/Message";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {
    VideoPlayer,
    VideoPlayerContent,
    VideoPlayerControlBar,
    VideoPlayerMuteButton,
    VideoPlayerPlayButton,
    VideoPlayerSeekBackwardButton,
    VideoPlayerSeekForwardButton,
    VideoPlayerTimeDisplay,
    VideoPlayerTimeRange,
    VideoPlayerVolumeRange,
} from '@/components/ui/shadcn-io/video-player';

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {getFileName, imageExtensions, videoExtensions} from "@/utils/fileChecker.ts";
export type MessageProps = HTMLAttributes<HTMLDivElement> & {
    isBelongToCurrentUser: boolean
};
export interface MessageContainerProps{
    children:ReactNode
    isBelongToCurrentUser:boolean
}

export const MessageContainer=({children,isBelongToCurrentUser}:MessageContainerProps)=>{
    const isBelongToCurrentUserStyle=isBelongToCurrentUser? "current-user" :"not-current-user"
    return (
        <div className={`flex group ${isBelongToCurrentUserStyle} w-full  flex-col     `}>
            <div className="group-[.current-user]:place-items-end">
                {children}
            </div>
        </div>
    )
}
interface MessageReplyProps {
    reply_content: {
        id: string
        content: string | null,
        isDeleted: boolean | null
        sender: {
            id: string
            full_name: string | null
            avatar_url: string | null
        }
    } | null,


    currentUserId:string | undefined
    sender: {
        id: string
        full_name: string | null
        avatar_url: string | null
    }
}

export const MessageReply = ({reply_content,sender, currentUserId}: MessageReplyProps) => {
    if (!reply_content) return null
    const isBelongToCurrentUser=sender?.id === currentUserId
    const delete_text_content = isBelongToCurrentUser ? `You unsent a message ` : `${reply_content?.sender?.full_name} unsent a message`

    const reply_text_content=
        (isBelongToCurrentUser && reply_content?.sender?.id === currentUserId) ?
            "You replied to yourself" :
            (isBelongToCurrentUser && reply_content?.sender?.id !== currentUserId) ?
                `You replied to ${reply_content?.sender?.full_name}` :

            reply_content?.sender?.id === sender?.id ? `${reply_content?.sender?.full_name} replied to themselves`:
            `${sender?.full_name} replied to you`





    return (
       <>

           <div className="flex  group-[.current-user]:flex-row-reverse  place-items-center">
               <div className=" w-10 "></div>
               <div className="px-3 gap-1 barlow-regular opacity-70  text-xs flex  place-items-center py-1">
                   <Reply size={15}/>
                   <p>{reply_text_content}</p>
               </div>

           </div>
           <div className="flex gap-3 translate-y-1 group-[.current-user]:flex-row-reverse  place-items-center ">
               <div className="w-10 "></div>

               <div className=" border  border-foreground/50  dark:border-white/30 p-3 rounded-md max-w-md  ">
                   <p className="barlow-regular opacity-70 break-all text-sm">
                       {reply_content?.isDeleted ? delete_text_content : reply_content?.content}

                   </p>

               </div>

           </div>
       </>
    )
}




export  interface MessageContentProps{
    content: string | null
    isMessageDeleted:boolean | null
}

export type MessageAvatarProps = ComponentProps<typeof Avatar> & {
    src: string;
    name?: string;
};
export const MessageAvatar = ({
                                  src,
                                  name,
                                  className,
                                  ...props
                              }: MessageAvatarProps) => (
    <Avatar
        className={cn('size-10   ring-1 ring-border', className)}
        {...props}
    >
        <AvatarImage alt="" className="mt-0 mb-0" src={src}/>
        <AvatarFallback>{name?.slice(0, 2) || 'ME'}</AvatarFallback>
    </Avatar>
);
export type ActionProps = MessageProps & {
    onRemoveMessage: () => void
    onReplyMessage: () => void
    onReactMessage:(emoji:string)=>void
}
export const MessageAction = ({isBelongToCurrentUser, onRemoveMessage, onReplyMessage,onReactMessage}: ActionProps) => {
  //TODO WILL MAKE IT DYNAMIC

    const emojis = ["😀", "❤️", "👍", "🎉", "😭", "😎"];

    return (
        <div className="">
            <div
                className={`flex ${!isBelongToCurrentUser && "flex-row-reverse"} group-hover:flex   place--center  gap-1 h-full `}>

                <Button variant={"outline"} onClick={onReplyMessage} className="text-xs "><Reply size={20}/></Button>
                {isBelongToCurrentUser &&   <Popover >
                    <PopoverTrigger asChild>
                    <Button variant={"outline"}>    <EllipsisVertical className="text-gray-600 dark:text-white" size={20}/></Button>
                    </PopoverTrigger>
                    <PopoverContent side={"bottom"} className="p-1 z-40 ">
                        <div className="p-0 flex gap-1 justify-center flex-col">
                            <Button onClick={onRemoveMessage} variant={"outline"} size={"sm"}
                                    className={"barlow-regular"}>Unsend</Button>
                            <Button variant={"outline"} size={"sm"} className={"barlow-regular"}>Edit</Button>

                        </div>
                    </PopoverContent>
                </Popover>}
                <Popover>
                    <PopoverTrigger >

                        <Button variant={"outline"}> <SmilePlus size={20}/></Button>
                    </PopoverTrigger>
                    <PopoverContent side={"top"} className="p-[5px] z-40  border">
                        <div className="p-0 flex    ">
                            {emojis.map((emoji, index) => (
                                <Button onClick={()=>onReactMessage(emoji)} key={index} variant="ghost" size="icon" style={{ fontSize: 20 }}>
                                    {emoji}
                                </Button>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>

    )
}

interface MessageReactionProps {
    reactions: Reaction[]


}

export const MessageReactions = ({reactions}: MessageReactionProps) => {
    if (reactions.length <= 0) return null
    return (
     <div  className="z-30 flex group-[.current-user]:justify-start place-items-center justify-end  w-full">
         <DropdownMenu>
             <DropdownMenuTrigger>
                 <button className="  -translate-y-2 cursor-pointer -bottom-4   -right-3 ">
                     <div className=" p-[2px]  rounded-md bg-white dark:bg-[#191919]/70  ">
                         <div className=" bg-secondary pb-1 rounded-md px-1 py-[0.4px] text-nowrap text-sm">
                             {reactions?.slice(0,2).map(({emoji})=>{
                                 return emoji
                             })}
                         </div>
                     </div>
                 </button>
             </DropdownMenuTrigger>
             <DropdownMenuContent  className="min-w-xs">
                 <DropdownMenuLabel className={"text-center PlusJakartaSans-ExtraBold pt-4"}>Message
                     Reactions</DropdownMenuLabel>
                 <DropdownMenuSeparator className={"  "}/>
                 <ScrollArea className="h-auto w-full mt-2 ">
                     {reactions?.map(({emoji, user,created_at}, index) => {
                         return (


                             <DropdownMenuItem key={index} className={""}>
                                 <li className="flex justify-between w-full gap-x-3 py-1">
                                     <div className="flex min-w-0 w-full justify-between  gap-x-4 pr-2">

                                         <div className="flex w-full gap-2 place-items-center ">
                                             <Avatar className="size-7 rounded-full">
                                                 <AvatarImage src={user?.avatar_url ?? ""}
                                                              alt={"User"}/>
                                                 <AvatarFallback className="rounded-lg">Us</AvatarFallback>
                                             </Avatar>
                                             <div className=" flex  flex-col  w-full ">
                                                 <p className=" PlusJakartaSans-SemiBold text-xs leading-3">{user?.full_name}</p>
                                                 <p className="text-xs   ">{new Date(created_at).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true })
                                                 }</p>
                                             </div>
                                         </div>
                                         <p className="text-2xl ">{emoji}</p>
                                     </div>
                                 </li>
                             </DropdownMenuItem>
                         )
                     })}
                 </ScrollArea>

             </DropdownMenuContent>
         </DropdownMenu>
     </div>
    )
}

interface MessageFilesProps {
    url: string|null;
    isDeletedMessage:boolean | null

}

export default function MessageFiles({ url ,isDeletedMessage}: MessageFilesProps) {



    if (!url) return null
    if (isDeletedMessage) return null



    if (imageExtensions.test(url)) {
        return (
            <div className="pt-1  mt-1  max-w-xs">
                <img
                    src={url}
                    alt={getFileName(url)}
                    className="rounded-xl shadow-md max-h-60 object-cover cursor-pointer"
                    onClick={() => window.open(url, "_blank")}
                />
            </div>
        );
    }
    if (videoExtensions.test(url)) {
        return (
            <div className="pt-1 mt-1 max-w-">
                <VideoPlayer className="overflow-hidden rounded-lg border">
                    <VideoPlayerContent
                        crossOrigin=""
                        muted
                        preload="auto"
                        slot="media"
                        src={url}   />
                    <VideoPlayerControlBar>
                        <VideoPlayerPlayButton  />
                        <VideoPlayerSeekBackwardButton />
                        <VideoPlayerSeekForwardButton />
                        <VideoPlayerTimeRange />
                        <VideoPlayerTimeDisplay showDuration />
                        <VideoPlayerMuteButton />
                        <VideoPlayerVolumeRange />
                    </VideoPlayerControlBar>
                </VideoPlayer>
            </div>
        );
    }
    return (
        <a  href={url}  target="_blank" className="flex mt-1  items-center gap-2 p-3 border rounded-md  max-w-sm bg-secondary">
            <FileText strokeWidth={1.5} className="w-5 h-5 dark:text-white" />
            <div    className="flex-1"
                rel="noopener noreferrer"  >
                <p className="text-xs barlow-regular truncate">{getFileName(url)}</p>

            </div>
        </a>
    );
}
export type UnsentMessageFallbackProps =  HTMLAttributes<HTMLDivElement>
export const UnsentMessageFallback=({children} :UnsentMessageFallbackProps)=>{
        return (
            <div
                className={cn(
                    "flex flex-col gap-2  rounded-lg px-3 py-2 text-xs lg:text-sm",
                     "bg-background  text-black/70 dark:bg-[#1C1D1F] border  border-foreground/40 dark:border-white/50 dark:text-white/50 italic"
                )}>
                <div>{children}</div>
            </div>
        );
    }
export const MessageContent=({content,isMessageDeleted}:MessageContentProps)=>{
   if (!content) return  null
        if (isMessageDeleted) return  <UnsentMessageFallback>{content}</UnsentMessageFallback>


    return (
        <div className="">
            <div className=" group-[.not-current-user]:bg-secondary border  group-[.current-user]:bg-blue-600 px-4 p-2 rounded-md max-w-md  ">
                <p className="barlow-regular break-all text-foreground  group-[.current-user]:text-white dark:text-white  text-xs lg:text-sm">
                    {content}
                </p>
            </div>
        </div>
    )
}


export interface MessageAttachmentFilesProps{
    children:ReactNode
    file_url:string |null
}

export  const MessageAttachmentFiles=({children,file_url}:MessageAttachmentFilesProps)=>{
if (!file_url) return  null
    return (
        <div className="flex group-[.current-user]:flex-row-reverse  place-items-center  gap-2  z-1">

            <div className=" w-full flex  rounded-md max-w-md  ">
                {children}
            </div>
            <div className="flex place-items-center ">

            </div>
        </div>
    )
}