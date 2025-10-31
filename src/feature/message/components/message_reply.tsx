import type {MessageReplyProps} from "@/feature/message/types/message.ts";
import {Reply} from "lucide-react";

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

