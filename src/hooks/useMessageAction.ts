import {useMutation} from "@tanstack/react-query";
import {supabase} from "@/lib/supabase.ts";

const removeMessage = async (messageID: string) => {

    const {error} = await supabase
        .from('messages')
        .update({isDeleted: true})
        .eq('id', messageID)

    if (error) throw new Error(error?.message)

}


export const useRemoveMessage = () => {
    return useMutation({
        mutationFn: removeMessage
    })
}

