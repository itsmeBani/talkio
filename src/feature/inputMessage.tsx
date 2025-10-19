import {Button} from "@/components/ui/button.tsx";
import {BookImage, FileText, SendIcon, SmilePlus, XIcon} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover.tsx";
import {
    EmojiPicker,
    EmojiPickerContent,
    EmojiPickerFooter,
    EmojiPickerSearch,
} from "@/components/ui/emoji-picker.tsx";
import {useRef, useState, type FormEvent, type ChangeEvent} from "react";


interface MessageProps {
    action: (message: string, file: File | null) => Promise<void>;
}

function InputMessage({action}: MessageProps) {
    const GalleryRef = useRef<HTMLInputElement | null>(null);
    const [message, setMessage] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading,setLoading]=useState(false)
    const OpenImagePicker = () => {
        GalleryRef.current?.click();
    };

    const HandleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0] || null;
        setFile(selected);

        if (selected && selected.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(selected);
        } else {
            setPreview(null);
        }
    };

    const HandleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        await action(message, file);
        setMessage("");
        setFile(null);
        setPreview(null);
        setLoading(false)
    };

    const removeSelectedFile = () => {
        setFile(null);
        setPreview(null);
    };

    return (
        <div className="w-full flex bg-background z-40  flex-col gap-2 p-2 lg:p-3">
            {preview && (
                <div className="w-full flex justify-start items-center gap-2">
                   <div className="relative">
                       <img
                           src={preview}
                           alt="preview"
                           className="aspect-square max-h-18 object-cover rounded-lg border shadow-md"
                       />
                       <button onClick={removeSelectedFile} className="border hover:text-red-500 absolute -right-2 bg-secondary rounded-full p-[3px] -top-2"><XIcon size={13}/></button>
                   </div>

                </div>
            )}

            {file && !preview && (

              <div className="flex">
                  <div className="flex  relative items-center gap-2 p-3 border rounded-md  bg-secondary">
                      <FileText strokeWidth={1.5} className="w-5 h-5 dark:text-white"/>
                      <div className="flex-1" >
                          <p className="text-xs barlow-regular truncate">{file.name}</p>

                      </div>
                      <button onClick={removeSelectedFile} className="border hover:text-red-500 absolute -right-2 bg-secondary rounded-full p-[3px] -top-2"><XIcon size={13}/></button>

                  </div>
              </div>
            )}

            <div className="w-full gap-2 flex place-items-center justify-center">
                <Button
                    onClick={OpenImagePicker}
                    variant={"outline"}
                    size={"icon"}
                >
                    <BookImage/>
                </Button>
                <Input
                    ref={GalleryRef}
                    id="file"
                    type="file"
                    accept="*/*"
                    onChange={HandleFileChange}
                    className="hidden"
                />

                <Popover>
                    <PopoverTrigger>
                        <Button variant={"outline"} size={"icon"}>
                            <SmilePlus/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className={"z-[999]"}>
                        <EmojiPicker
                            className="max-h-lg max-h-[300px]  rounded-lg border shadow-md"
                            onEmojiSelect={({emoji}) =>
                                setMessage((prev) => prev + emoji)
                            }
                        >
                            <EmojiPickerSearch/>
                            <EmojiPickerContent/>
                            <EmojiPickerFooter/>
                        </EmojiPicker>
                    </PopoverContent>
                </Popover>

                <form
                    onSubmit={HandleSendMessage}
                    className="flex w-full gap-2"
                >
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                    />

                        <Button type="submit" disabled={(!message && !file) || loading}>
                            <SendIcon className="text-white"/>
                        </Button>

                </form>
            </div>
        </div>
    );
}

export default InputMessage;
