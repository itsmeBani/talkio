
import { Button } from "@/components/ui/button"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription, ItemMedia,

    ItemTitle,
} from "@/components/ui/item"
import {Trash} from "lucide-react";

function ManageConversation() {
    return (
        <div className="flex flex-col w-full  h-full ">
            <header>
                <h2 className="text-xl PlusJakartaSans-Bold leading-9 ">Manage Conversation</h2>

            </header>
            <div className="flex flex-col py-3 gap-3 ">
                <Item variant="outline">
                    <ItemContent>
                        <ItemTitle>Basic Item</ItemTitle>
                        <ItemDescription>
                            A simple item with title and description.
                        </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <Button variant="outline" size="sm">
                            Action
                        </Button>
                    </ItemActions>
                </Item>
                <Item variant="outline" className="border border-red-500/70">
                    <ItemMedia variant="icon" className="border-destructive bg-destructive/10">
                        <Trash className={"text-destructive "} />
                    </ItemMedia>
                    <ItemContent >

                        <ItemTitle className={"text-red-400"}>Remove Conversation</ItemTitle>

                        <ItemDescription>
                            This action cannot be undone
                        </ItemDescription>

                    </ItemContent>
                    <ItemActions>
                        <Button variant="destructive" size="sm"  >
                            Delete
                        </Button>
                    </ItemActions>
                </Item>
            </div>
        </div>

    );
}

export default ManageConversation;