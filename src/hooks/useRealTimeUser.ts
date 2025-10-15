import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase"; // adjust path to your supabase client
import type { Users } from "@/types/Users";

export function useRealtimeUsers() {
    const queryClient = useQueryClient();

    useEffect(() => {
        const channel = supabase
            .channel("users-changes")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "users",
                },
                (payload) => {
                    console.log("Realtime payload:", payload);

                    queryClient.setQueryData<Users[]>(["users"], (oldData = []) => {
                        if (payload.eventType === "INSERT") {
                            return [...oldData, payload.new as Users];
                        }
                        if (payload.eventType === "DELETE") {
                            return oldData.filter((user) => user.id !== payload.old.id);
                        }
                        if (payload.eventType === "UPDATE") {
                            return oldData.map((user) =>
                                user.id === payload.new.id ? (payload.new as Users) : user
                            );
                        }
                        return oldData;
                    });
                }
            )
            .subscribe((status) => {
                console.log("Realtime subscription status:", status);
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [queryClient]);
}
