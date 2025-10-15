import {queryOptions} from "@tanstack/react-query";
import type {Users} from "@/types/Users.ts";
import {supabase} from "@/lib/supabase.ts";


export const fetchUsers = () => {
    return queryOptions({
        queryFn: getAllUsers,
        queryKey: ["users"]
    })
}


const getAllUsers = async (): Promise<Users[]> => {


    const {data} = await supabase
        .from('users')
        .select()

    return data || []
}
