
export interface Users{
    avatar_url: string | null
    created_at?: string
    email: string
    full_name: string | null
    id: string
}


export type CurrentUser=Users