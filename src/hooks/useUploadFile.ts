import { supabase } from "@/lib/supabase";

export function useUploadFile(bucket: string ,subBucket:string|undefined) {



    const uploadFile = async (file: File | null) => {
        if(!file || !bucket || !subBucket) return null


        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${subBucket}/${fileName}`;


        const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filePath, file);

        if (uploadError) {
            console.log(uploadError)
            return null;
        }


        const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
        return data.publicUrl;
    };


    return {
        uploadFile,
    };
}
