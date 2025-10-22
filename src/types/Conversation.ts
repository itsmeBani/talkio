export interface IUser {
    id: string;
    full_name: string | null;
    email: string;
    avatar_url: string | null;
}

export interface IConversation {
    id: string;
    created_at: string;
    user_one: IUser;
    user_two: IUser;
}
