import {useMutation, useQueryClient} from "@tanstack/react-query";
import {supabase} from "@/lib/supabase.ts";

export const useUpdateAvatar = (userId: string |undefined) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (file: File) => {
            if (!file &&  !userId) throw new Error("User ID is required");



            const filePath = `${userId}/${file.name}`;

            // Upload the file to Supabase Storage
            const {data, error: uploadError} = await supabase.storage
                .from("profile_picture")
                .upload(filePath, file, {
                    cacheControl: "3600",
                    upsert: true,
                });
            if (uploadError) throw uploadError;

            console.log("Uploaded file info:", data);

            // Get the public URL for the uploaded image
            const {data: avatar_url} = supabase.storage
                .from("profile_picture")
                .getPublicUrl(filePath);



            const {data: updatedProfile, error: updateError} = await supabase
                .from("users")
                .update({avatar_url: avatar_url?.publicUrl})
                .eq("id", userId ?? "")
                .select()


            if (updateError) throw updateError;
            return updatedProfile;
        },
        onSuccess: (updatedUser) => {

            queryClient.setQueryData(["userProfile", userId], updatedUser[0]);
        },
        onError: (error) => {
            console.error("Error updating avatar:", error);
        },
    });
};
