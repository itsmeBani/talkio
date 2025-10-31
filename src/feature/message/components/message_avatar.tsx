import type {MessageAvatarProps} from "@/feature/message/types/message.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {cn} from "@/lib/utils.ts";

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