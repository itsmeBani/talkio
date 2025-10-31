import type {MessageReactionProps} from "@/feature/message/types/message.ts";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

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

