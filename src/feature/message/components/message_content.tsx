import type {MessageContentProps} from "@/feature/message/types/message.ts";
import {UnsentMessageFallback} from "@/feature/message/components/message_removed_fallback.tsx";

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

