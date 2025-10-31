import type {MessageFilesProps} from "@/feature/message/types/message.ts";
import {getFileName, imageExtensions, videoExtensions} from "@/utils/fileChecker.ts";
import {
    VideoPlayer,
    VideoPlayerContent,
    VideoPlayerControlBar, VideoPlayerMuteButton,
    VideoPlayerPlayButton, VideoPlayerSeekBackwardButton, VideoPlayerSeekForwardButton,
    VideoPlayerTimeDisplay, VideoPlayerTimeRange, VideoPlayerVolumeRange
} from "@/components/ui/shadcn-io/video-player";
import {FileText} from "lucide-react";

export const MessageFiles=({ url ,isDeletedMessage}: MessageFilesProps)=> {



    if (!url) return null
    if (isDeletedMessage) return null



    if (imageExtensions.test(url)) {
        return (
            <div className="pt-1  mt-1  max-w-xs">
                <img
                    src={url}
                    alt={getFileName(url)}
                    className="rounded-xl shadow-md max-h-60 object-cover cursor-pointer"
                    onClick={() => window.open(url, "_blank")}
                />
            </div>
        );
    }
    if (videoExtensions.test(url)) {
        return (
            <div className="pt-1 mt-1 max-w-">
                <VideoPlayer className="overflow-hidden rounded-lg border">
                    <VideoPlayerContent
                        crossOrigin=""
                        muted
                        preload="auto"
                        slot="media"
                        src={url}   />
                    <VideoPlayerControlBar>
                        <VideoPlayerPlayButton  />
                        <VideoPlayerSeekBackwardButton />
                        <VideoPlayerSeekForwardButton />
                        <VideoPlayerTimeRange />
                        <VideoPlayerTimeDisplay showDuration />
                        <VideoPlayerMuteButton />
                        <VideoPlayerVolumeRange />
                    </VideoPlayerControlBar>
                </VideoPlayer>
            </div>
        );
    }
    return (
        <a  href={url}  target="_blank" className="flex mt-1  items-center gap-2 p-3 border rounded-md  max-w-sm bg-secondary">
            <FileText strokeWidth={1.5} className="w-5 h-5 dark:text-white" />
            <div    className="flex-1"
                    rel="noopener noreferrer"  >
                <p className="text-xs barlow-regular truncate">{getFileName(url)}</p>

            </div>
        </a>
    );
}
