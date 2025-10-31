import type {ComponentProps, HTMLAttributes, ReactNode} from "react";
import type {Reaction} from "@/types/Message.ts";
import {Avatar} from "@/components/ui/avatar.tsx";


export type MessageProps = HTMLAttributes<HTMLDivElement> & {
    isBelongToCurrentUser: boolean
};

export interface MessageContainerProps{
    children:ReactNode
    isBelongToCurrentUser:boolean
}
export type MessageAvatarProps = ComponentProps<typeof Avatar> & {
    src: string;
    name?: string;
};


export interface MessageReplyProps {
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


export  interface MessageContentProps{
    content: string | null
    isMessageDeleted:boolean | null
}

export type ActionProps = MessageProps & {
    onRemoveMessage: () => void
    onReplyMessage: () => void
    onReactMessage:(emoji:string)=>void
}

export interface MessageReactionProps {
    reactions: Reaction[]
}


export interface MessageFilesProps {
    url: string|null;
    isDeletedMessage:boolean | null

}

export interface MessageAttachmentFilesProps{
    children:ReactNode
    file_url:string |null
}

export type UnsentMessageFallbackProps =  HTMLAttributes<HTMLDivElement>