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

export const fetchUserProfile = (userId: string | undefined) => {
    return queryOptions({
        queryKey: ["userProfile", userId],
        queryFn: () => getUserProfile(userId),
        enabled: !!userId,
    });
};


const getUserProfile = async (userId: string  | undefined): Promise<Users | null> => {
   if (!userId) return null
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }

    return data;
};