import {supabase} from "@/lib/supabase.ts";
import type {Database} from "@/lib/databaseT.ts";
import {queryOptions} from "@tanstack/react-query";


export const fetchConversation = (CurrentUserID: string | null | undefined, ReceiverID: string | null | undefined) => {

    return queryOptions({
        queryFn: () => getConversation(CurrentUserID, ReceiverID),
        queryKey: ["conversations", CurrentUserID, ReceiverID],
        enabled: !!CurrentUserID || !!ReceiverID
    })
}


const getConversation = async (
    CurrentUserID: string | null | undefined,
    ReceiverID: string | null | undefined
): Promise<Database['public']['Tables']['conversations']['Row'] | null> => {
    if (!CurrentUserID || !ReceiverID) return null;

    const { data } = await supabase
        .from("conversations")
        .select("*")
        .or(
            `and(user_one_id.eq.${CurrentUserID},user_two_id.eq.${ReceiverID}),and(user_one_id.eq.${ReceiverID},user_two_id.eq.${CurrentUserID})`
        )
        .maybeSingle();


    if (data) {
        return data;
    }

   if (!data){

    const { data: convo, error: insertError } = await supabase
        .from("conversations")
        .insert([
            {
                user_one_id: CurrentUserID,
                user_two_id: ReceiverID,
            },
        ])
        .select()
        .single();

    if (insertError) {
        console.error("Error creating conversation:", insertError);
        return null;
    }

    return convo;
}
return  null
};
