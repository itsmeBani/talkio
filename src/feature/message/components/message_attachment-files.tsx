import type {MessageAttachmentFilesProps} from "@/feature/message/types/message.ts";

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