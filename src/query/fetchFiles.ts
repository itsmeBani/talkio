import {supabase} from "@/lib/supabase.ts";
import {queryOptions} from "@tanstack/react-query";
import type {ConversationFiles} from "@/types/Files.ts";


export const fetchConversationFiles=(conversationId:string | undefined)=>{
    return queryOptions({
        queryFn:()=>getConversationFiles(conversationId),
        queryKey:["conversation-files",conversationId]
    })
}

export const getConversationFiles = async (conversationId: string| undefined):Promise<ConversationFiles[]> => {
    if (!conversationId) return [];

    const { data, error } = await supabase.storage
        .from("message_files")
        .list(conversationId);

    if (error) throw error;


    return data.map((file) => {
        const {data: publicUrl} = supabase.storage
            .from("message_files")
            .getPublicUrl(`${conversationId}/${file.name}`);

        return {
            name: file.name,
            url: publicUrl.publicUrl,
            created_at: file.created_at,
        };
    });
};


