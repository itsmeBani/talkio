export interface Message{
    id: string;
    content: string | null;
    created_at: string;
    conversation: {
        id: string;
        user_one_id: string;
        user_two_id: string;
    };
    sender: {
        id: string;
        full_name: string | null;
        avatar_url: string | null;
    };
    reactions: Reaction[];
}
export interface ReactionUser {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
}

export interface Reaction {
    emoji: string;
    created_at: string; // ISO string from Supabase
    user: ReactionUser;
}


export interface MessageReply {
    messageID:string,
    content:string
    senderName:string
}