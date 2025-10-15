export const imageExtensions = /\.(jpe?g|png|gif|webp|svg)$/i;
export const videoExtensions = /\.(mp4|webm|ogg)$/i;
export const getFileName = (fileUrl: string) =>
    fileUrl.split("/").pop() || "Unknown file";
