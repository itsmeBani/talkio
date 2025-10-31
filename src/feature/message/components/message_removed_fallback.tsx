import type {UnsentMessageFallbackProps} from "@/feature/message/types/message.ts";
import {cn} from "@/lib/utils.ts";

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
