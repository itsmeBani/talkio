import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type {Users} from "@/types/Users.ts";



interface UserCardProps {
    user: Users;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <li className="flex justify-between gap-x-6 py-3">
            <div className="flex min-w-0 gap-x-4">
                <Avatar className="size-12 rounded-full">
                    <AvatarImage src={user.avatar_url || ""} alt={user.full_name || "User"} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="lg:block md:hidden min-w-0 flex-auto">
                    <p className="text-sm/6 PlusJakartaSans-SemiBold leading-5">{user.full_name}</p>
                    <p className="truncate text-xs/5 PlusJakartaSans-Regular dark:text-white text-gray-600">
                        {user.email}
                    </p>
                </div>
            </div>

            <div className="md:hidden lg:block shrink-0 place-items-center justify-center sm:flex sm:flex-col sm:items-end">
                {/*{user.status === "offline" ? (*/}
                {/*    <p className="mt-1 text-xs/5 text-gray-500 PlusJakartaSans-Regular dark:text-white ">*/}
                {/*        Last seen <time>{user.lastSeen}</time>*/}
                {/*    </p>*/}
                {/*) : (*/}
                {/*    <div className="flex flex-col justify-end place-items-end">*/}
                {/*        <p className="text-xs/5 PlusJakartaSans-Regular dark:text-white  text-gray-600">Online</p>*/}
                {/*        <div className="flex-none rounded-full bg-emerald-500/30 p-1">*/}
                {/*            <div className="size-1.5 rounded-full bg-emerald-500"></div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}



                <div className="flex flex-col justify-end place-items-end">
                    <p className="text-xs/5 PlusJakartaSans-Regular dark:text-white  text-gray-600">Online</p>
                    <div className="flex-none rounded-full bg-emerald-500/30 p-1">
                        <div className="size-1.5 rounded-full bg-emerald-500"></div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default UserCard;
