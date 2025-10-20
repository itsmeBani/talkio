import {XIcon} from "lucide-react";

import InputMessage from "@/feature/inputMessage.tsx";
import {useRef, useState} from "react";
import {useParams} from "react-router-dom";
import useAuth from "@/context/authProvider.tsx";

import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {fetchConversation} from "@/query/fetchConversation.ts";
import {getUserMessages} from "@/query/fetchMessagesByUser.ts";
import {supabase} from "@/lib/supabase.ts";
import {Button} from "@/components/ui/button";
import Loader from "@/components/loader.tsx";
import {useRemoveMessage} from "@/hooks/useMessageAction.ts";
import {useMessageSubscription} from "@/hooks/useRealtimeMessage.ts";
import type {MessageReply as MessgaeReplyI} from "@/types/Message.ts";
import {useUploadFile} from "@/hooks/useUploadFile.ts";
import MessageFiles, {
    MessageAction,
    MessageAttachmentFiles, MessageAvatar,
    MessageContainer,
    MessageContent,
    MessageReactions,
    MessageReply
} from "@/components/message/message.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import ConversationPreferences from "@/feature/ConversationPreferences.tsx";
import LoadMoreButton from "@/components/ui/loadMore.tsx";


function UserMessages() {
    const {currentUser} = useAuth()
    const {userID} = useParams()
    const [replyMessage, setReplyMessage] = useState<MessgaeReplyI | null>(null)

    const messageContainerRef = useRef<HTMLDivElement | null>(null)
    const {data: conversation} = useQuery(fetchConversation(currentUser?.id, userID))
    const {mutate: RemoveMessage} = useRemoveMessage()

    const {data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ["users_conversation", conversation?.id],
        queryFn: ({pageParam = 0}) => getUserMessages(conversation?.id, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || lastPage.length < 5) {
                return undefined;
            }
            return allPages.length + 1;
        },
        select: (data) => ({
            pages: [...data.pages].reverse(),
            pageParams: [...data.pageParams].reverse(),
        }),
        enabled: !!conversation?.id

    })
    const messages = data?.pages.flat().map((content) => content)
    const {uploadFile} = useUploadFile("message_files",conversation?.id);
    useMessageSubscription(conversation?.id);


    const SendMessage = async (message: string, images: File | null) => {


        if (message.trim().length === 0 && !images) return
        const fileUrl = await uploadFile(images)

        if (currentUser?.id && conversation?.id) {
            const {error} = await supabase
                .from("messages")
                .insert([
                    {
                        conversation_id: conversation.id,
                        sender_id: currentUser?.id,
                        content: message,
                        reply_to_id: replyMessage?.messageID ?? null,
                        image_url: fileUrl

                    },
                ])
            setReplyMessage(null)
            messageContainerRef.current?.scrollIntoView({behavior: "smooth"})

            if (error) {
                console.error("Error sending message:", error);
                throw error;
            }
        }

    }

    const HandleReplyMessage = (messageContent: string | null, messageID: string, senderName: string) => {
        setReplyMessage({
            content: messageContent ?? "",
            messageID: messageID,
            senderName: senderName
        })
    }

    const CloseReplyMessage = () => {
        setReplyMessage(null)
    }


    const AddEmojiToMessage = async (messageID: string, reactorUserID: string | undefined, emoji: string) => {

        if (!reactorUserID) return
        await supabase
            .from("reactions")
            .upsert(
                [
                    {
                        message_id: messageID,
                        user_id: reactorUserID,
                        emoji: emoji,
                    },
                ],
                {
                    onConflict: "message_id,user_id"
                }
            ).select()

    }

    return (


        <div className=" h-full   relative     flex   flex-col    justify-between  place-items-center ">


                <ConversationPreferences conversationId={conversation?.id} />

            <div className={"w-full  h-full overflow-hidden "}>
                <div ref={messageContainerRef} className="flex pt-2 flex-col     overflow-y-auto  h-full w-full bg-blue-100/5 gap-2      ">


                    {isLoading && <Loader />}
                    <LoadMoreButton hasNextPage={hasNextPage}
                                    isFetchingNextPage={isFetchingNextPage}
                                    fetchNextPage={() => fetchNextPage().then()}/>

                        <div className={"gap-2  p-4 h-full   pb-10   flex flex-col"}>
                            {messages?.map(({content, sender, reactions, id, isDeleted, reply_to, image_url}, index) => {

                                const isBelongToCurrentUser = currentUser?.id === sender?.id
                                const messageText = isDeleted
                                    ? `${isBelongToCurrentUser ? "You" : sender?.full_name} unsent a message`
                                    : content;
                                return (


                                    <MessageContainer key={index} isBelongToCurrentUser={isBelongToCurrentUser}>
                                        <MessageReply
                                            currentUserId={currentUser?.id}
                                            sender={sender}
                                            reply_content={reply_to}
                                        />
                                        <div className="flex gap-2  group-[.current-user]:flex-row-reverse  ">
                                            <MessageAvatar src={sender?.avatar_url || ""} name={sender?.full_name || "unknown"}
                                                           className="lg:w-10 lg:h-10 h-8 w-8 mt-[2px]  "/>
                                            <div
                                                className="flex  group-[.current-user]:place-items-end place-items-start flex-col  ">
                                                <Popover>
                                                    <PopoverTrigger className={"text-start z-10"}>
                                                        <MessageContent isMessageDeleted={isDeleted} content={messageText}/>

                                                    </PopoverTrigger>
                                                    <PopoverContent sideOffset={0}
                                                                    side={isBelongToCurrentUser ? "left" : "right"}
                                                                    className={"border-none z-30  bg-transparent shadow-none"}>
                                                        {!isDeleted && (
                                                            <MessageAction
                                                                onReactMessage={(emoji) => {
                                                                    AddEmojiToMessage(id, currentUser?.id, emoji).then()
                                                                }}
                                                                isBelongToCurrentUser={isBelongToCurrentUser}
                                                                onRemoveMessage={() => RemoveMessage(id)}
                                                                onReplyMessage={() => HandleReplyMessage(content, id, sender?.full_name ?? "")}
                                                            />
                                                        )}

                                                    </PopoverContent>
                                                </Popover>
                                                {!isDeleted &&
                                                    <>
                                                        <MessageReactions
                                                            reactions={[...reactions]}/>
                                                        <MessageAttachmentFiles file_url={image_url}>
                                                            <MessageFiles
                                                                url={image_url}
                                                                isDeletedMessage={isDeleted}/>
                                                        </MessageAttachmentFiles>
                                                    </>

                                                }


                                            </div>


                                        </div>


                                    </MessageContainer>
                                )
                            })}
                        </div>




                </div>
            </div>


            {replyMessage &&
                <div
                    className="px-4 z-40  bg-background  border-t-1 pt-4 pb-0 w-full bg-blue flex place-items-center  justify-between  ">
                    <Button onClick={CloseReplyMessage} variant={"outline"}>
                        <XIcon/>
                    </Button>
                    <div className="flex  flex-col overflow-hidden">
                        <h1 className={"text-right pr-3 PlusJakartaSans-SemiBold text-sm"}>Replying
                            to {replyMessage?.senderName}</h1>
                        <p className={"lg:max-w-xs truncate PlusJakartaSans-Regular dark:text-white/70 text-xs"}>{replyMessage?.content}</p>
                    </div>

                </div>
            }


                <InputMessage action={SendMessage}/>


        </div>
    );
}

export default UserMessages;