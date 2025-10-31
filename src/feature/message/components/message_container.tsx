import type {MessageContainerProps} from "@/feature/message/types/message.ts";

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