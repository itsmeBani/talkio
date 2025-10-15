import { supabase } from "@/lib/supabase";

export const isUserExist = async (userID: string) => {
    try {
        const {data} = await supabase
            .from("users")
            .select("id")
            .eq("id", userID)
            .single();

        return !!data
    } catch (err) {
        console.log(err)
    }
}




export const isConversationExist = async (conversationID: string | null |undefined) => {
    if (!conversationID) return false
    try {
        const {data} = await supabase
            .from("conversations")
            .select("id")
            .eq("id", conversationID)

        console.log("convo",data)
        return !!data
    } catch (err) {
        console.log(err)
    }
}


