import {Link} from "react-router-dom";


import {useQuery} from "@tanstack/react-query";
import {fetchUsers} from "@/query/fetchUsers.ts";
import {useRealtimeUsers} from "@/hooks/useRealTimeUser.ts";
import UserCard from "@/components/UserCard.tsx";
import UserCardSkeleton from "@/components/loader/UserCardSkeleton.tsx";


export function Users() {
    const {data: usersData, isPending} = useQuery(fetchUsers())

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
            <div
                className="   lg:block sticky top-0 bg-background  PlusJakartaSans-ExtraBold px-3 text-foreground py-3 text-2xl z-1 ">Recent
                Chats
            </div>

            {isPending && <>
                {Array.from({length: 10}).map(() => {
                    return (
                        <div className=" w-full px-2  rounded-md">
                         <UserCardSkeleton/>
                        </div>)
                })}
            </>}
            {usersData?.map((user) => (
                <Link to={`message/${user?.id}`} key={user.id} className="w-full px-2 hover:bg-muted rounded-md">
                    <UserCard user={user}/>
                </Link>
            ))}
        </ul>
    );
}


