import type {ActionProps} from "@/feature/message/types/message.ts";
import {Button} from "@/components/ui/button.tsx";
import {EllipsisVertical, Reply, SmilePlus} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";

export const MessageAction = (
    {
        isBelongToCurrentUser,
        onRemoveMessage,
        onReplyMessage,
        onReactMessage

    }: ActionProps) => {


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
