
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {cn} from "@/lib/utils.ts";
import {Button, buttonVariants} from "@/components/ui/button.tsx";
import {Trash2} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";

function Account() {



    return (
        <section>


            {/*<Card>*/}
            {/*  <CardHeader>*/}
            {/*    <CardTitle>Account Settings</CardTitle>*/}
            {/*    <CardDescription>Manage your user-settings preferences and subscription.</CardDescription>*/}
            {/*  </CardHeader>*/}
            {/*  <CardContent className="space-y-6">*/}
            {/*    <div className="flex items-center justify-between">*/}
            {/*      <div className="space-y-1">*/}
            {/*        <Label className="text-base">Account Status</Label>*/}
            {/*        <p className="text-muted-foreground text-sm">Your user-settings is currently active</p>*/}
            {/*      </div>*/}
            {/*      <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">*/}
            {/*        Active*/}
            {/*      </Badge>*/}
            {/*    </div>*/}
            {/*    <Separator />*/}
            {/*    <div className="flex items-center justify-between">*/}
            {/*      <div className="space-y-1">*/}
            {/*        <Label className="text-base">Subscription Plan</Label>*/}
            {/*        <p className="text-muted-foreground text-sm">Pro Plan - $29/month</p>*/}
            {/*      </div>*/}
            {/*      <Button variant="outline">Manage Subscription</Button>*/}
            {/*    </div>*/}
            {/*    <Separator />*/}
            {/*    <div className="flex items-center justify-between">*/}
            {/*      <div className="space-y-1">*/}
            {/*        <Label className="text-base">Account Visibility</Label>*/}
            {/*        <p className="text-muted-foreground text-sm">*/}
            {/*          Make your profile visible to other users*/}
            {/*        </p>*/}
            {/*      </div>*/}
            {/*      <Switch defaultChecked />*/}
            {/*    </div>*/}
            {/*    <Separator />*/}
            {/*    <div className="flex items-center justify-between">*/}
            {/*      <div className="space-y-1">*/}
            {/*        <Label className="text-base">Data Export</Label>*/}
            {/*        <p className="text-muted-foreground text-sm">Download a copy of your data</p>*/}
            {/*      </div>*/}
            {/*      <Button variant="outline">Export Data</Button>*/}
            {/*    </div>*/}
            {/*  </CardContent>*/}
            {/*</Card>*/}

            <Card className="border-destructive/50">
                <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>Irreversible and destructive actions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <Label className="text-base">Delete Account</Label>
                            <p className="text-muted-foreground text-sm">
                                Permanently delete your account and all data
                            </p>
                        </div>

                        <Dialog>
                            <DialogTrigger className={cn(buttonVariants({ variant: "destructive" }))}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Account
                            </DialogTrigger>
                            <DialogContent  className="max-w-md rounded-lg border-destructive/50  shadow-lg">
                                <DialogHeader>
                                <DialogTitle className="text-lg Aeonik-bold ">
                                    Are you absolutely sure?
                                </DialogTitle>
                                    <DialogDescription className="text-sm Aeonik-semibold">
                                        This action is permanent   and will delete all your
                                        data and account settings. Type <strong className="text-red-500">DELETE</strong> to confirm.
                                    </DialogDescription>


                                </DialogHeader>

                                <div className="mt-4">
                                    <Input placeholder="Type DELETE to confirm"
                                              className="text-sm "
                                    />
                                </div>

                                <DialogFooter className="mt-6 flex justify-end gap-2">


                                    <DialogClose  className={cn(buttonVariants({ variant: "outline" }))}>
                                            Cancel
                                    </DialogClose>

                                    <Button
                                        variant="destructive"
                                        // onClick={handleDelete}
                                        // disabled={confirmationText !== "DELETE" || isDeleting}
                                        className="flex items-center gap-2"
                                    >
                                     Delete Account
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}

export default Account;