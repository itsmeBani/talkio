import {supabase} from "@/lib/supabase.ts";
import {queryOptions} from "@tanstack/react-query";
import type {IConversation} from "@/types/Conversation.ts";



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
):Promise<IConversation  | null> => {
    if (!CurrentUserID || !ReceiverID) return null;

    const { data } = await supabase
        .from("conversations")
        .select(`
    id,
    created_at,
    user_one:users!conversations_user_one_id_users_id_fk(
      id,
      full_name,
      email,
      avatar_url
    ),
    user_two:users!conversations_user_two_id_users_id_fk(
      id,
      full_name,
      email,
      avatar_url
    )
  `)
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
        .select(`
    id,
    created_at,
    user_one:users!conversations_user_one_id_users_id_fk(
      id,
      full_name,
      email,
      avatar_url
    ),
    user_two:users!conversations_user_two_id_users_id_fk(
      id,
      full_name,
      email,
      avatar_url
    )
  `)
        .single();

    if (insertError) {
        console.error("Error creating conversation:", insertError);
        return null;
    }

    return convo;
}
return  null
};
