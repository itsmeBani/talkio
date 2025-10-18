
import {Link} from "react-router-dom";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

import {useQuery} from "@tanstack/react-query";
import {fetchUsers} from "@/query/fetchUsers.ts";
import {useRealtimeUsers} from "@/hooks/useRealTimeUser.ts";


export function Users() {
      const {data:usersData}=useQuery(fetchUsers())

    useRealtimeUsers()




    // useEffect(() => {
    //     const channel = supabase.channel('room1')
    //     channel
    //         .on('presence', { event: 'sync' }, () => {
    //             console.log('Synced presence state: ', channel.presenceState())
    //         })
    //         .subscribe(async (status) => {
    //             if (status === 'SUBSCRIBED') {
    //                 await channel.track({ online_at: new Date().toISOString() })
    //             }
    //         })
    // }, []);

    return (
        <ul role="list" className="flex flex-col px-1 w-full">
            <div className="   lg:block sticky top-0 bg-background  PlusJakartaSans-ExtraBold px-3 text-foreground py-3 text-2xl z-1 ">Recent Chats</div>

            {usersData?.map((user) => (
                <Link to={`message/${user?.id}`} key={user.id} className="w-full px-2 hover:bg-muted rounded-md">
                    <li className="flex justify-between gap-x-6  py-3">
                        <div className="flex min-w-0 gap-x-4">

                            <Avatar className="size-12 rounded-full">
                                <AvatarImage src={user?.avatar_url || ""} alt={user?.full_name || "User"}/>
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="lg:block md:hidden min-w-0 flex-auto">
                                <p className="text-sm/6 PlusJakartaSans-SemiBold leading-5">{user.full_name}</p>
                                <p className=" truncate text-xs/5 PlusJakartaSans-Regular dark:text-white text-gray-600">
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
                </Link>
            ))}
        </ul>
    );
}


