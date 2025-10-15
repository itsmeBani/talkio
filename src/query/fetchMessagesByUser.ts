import {supabase} from "@/lib/supabase";


export async function getUserMessages(conversationId: string | undefined, page: number) {

    const PAGE_SIZE = 10;
    const FROM = (page - 1) * PAGE_SIZE;
    const TO = FROM + PAGE_SIZE - 1;


    const {data, error} = await supabase
        .from("messages")
        .select(`
            id,
            content,
            isDeleted,
            created_at,
            image_url,
            conversation:conversation_id (
                id,
                user_one_id,
                user_two_id
            ),
            sender:sender_id (
                id,
                full_name,
                avatar_url
            ),
           
            reactions (
                emoji,
                created_at,
                user:user_id (
                    id,
                    full_name,
                    avatar_url
                )
            ),
              reply_to:reply_to_id (
               id,
              content,
              isDeleted,
              image_url,
             sender:sender_id (
             id,
             full_name,
             avatar_url
        )
      )
        `)
        .eq("conversation_id", conversationId || "")
        .order("created_at", {ascending: false})
        .range(FROM, TO);

    if (error) throw error;

    return data ? [...data].reverse() : [];
}