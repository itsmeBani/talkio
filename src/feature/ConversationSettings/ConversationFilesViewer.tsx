import {Tooltip, TooltipContent} from "@/components/ui/tooltip.tsx";
import type {ConversationFiles} from "@/types/Files.ts";
import {imageExtensions} from "@/utils/fileChecker.ts";
import {File, FileDownIcon} from "lucide-react";
import {TooltipTrigger} from "@/components/ui/tooltip.tsx";


interface ConversationFilesViewerProps {
    files: ConversationFiles[] | undefined
}

function ConversationFilesViewer({files}: ConversationFilesViewerProps) {


    const renderFiles = (url: string, fileName: string) => {
        if (imageExtensions.test(url)) {
            return <img className="w-full h-full object-cover" alt={""} src={url}/>
        }
        return <button  onClick={() => window.open(url, "_blank")}  className={"w-full group flex-col gap-1 flex place-items-center justify-center h-full bg-secondary"}>

            <File size={30} className="group-hover:hidden text-foreground/70"/>
            <FileDownIcon size={30} className="group-hover:text-blue-500 group-hover:block hidden"/>
            <p className=" truncate w-full text-foreground/70 text-[10px] PlusJakartaSans-Regular group-hover:text-blue-500">{fileName}</p>
        </button>

    }


    return (
        <div className="flex flex-col w-full  h-full ">
            <header>
                <h2 className="text-xl PlusJakartaSans-Bold leading-9 ">Shared Files & Photos</h2>

            </header>
           <div className="flex flex-col py-3">
               <div className="grid grid-cols-3 w-full     gap-2   rounded-xl">

                   {files?.map(({name, url,created_at}, i) => (

                       <Tooltip key={i}>
                           <TooltipTrigger>
                               <div
                                   key={i}
                                   className="aspect-square border  border-foreground/20 dark:border-foreground/20 rounded-md overflow-hidden bg-secondary rounded-lg flex items-center justify-center text-white font-medium"
                               >
                                   {renderFiles(url, name)}
                               </div>
                           </TooltipTrigger>
                           <TooltipContent>

                               <p className="text-xs text-white ">{new Date(created_at).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true })}</p>

                           </TooltipContent>
                       </Tooltip>
                   ))}
               </div>
           </div>
        </div>

    );
}

export default ConversationFilesViewer;