import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Camera, Calendar, Mail } from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {fetchUserProfile} from "@/query/fetchUsers.ts";
import useAuth from "@/context/authProvider.tsx";
import {useUpdateAvatar} from "@/feature/users/actions/useUpdateAvatar.ts";
import React, {useRef} from "react";


export default function ProfileHeader() {


    const {currentUser}=useAuth()
    const {data:profile}=useQuery(fetchUserProfile(currentUser?.id))
    const { mutate: updateAvatar, isPending } = useUpdateAvatar(currentUser?.id);
   const avatar_ref=useRef<HTMLInputElement | null>(null)
    const handleChangeAvatar = () => {
        avatar_ref?.current?.click();
    }



    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        if(file) updateAvatar(file)

    };

    return (
    <Card className="bg-background outline-none">
      <CardContent className="p-6">
        <div className="flex flex-col Aeonik-regular items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24 object-cover">
              <AvatarImage src={profile?.avatar_url ?? ""} alt="Profile" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>

            </Avatar>
            <Button onClick={handleChangeAvatar} disabled={isPending}
              size="icon"
              className="absolute -right-2 -bottom-2 text-white bg-blue-500 h-8 w-8 rounded-full">
              <Camera />
            </Button>
              <input ref={avatar_ref}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
              />

          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl Aeonik-bold">{profile?.full_name}</h1>

            </div>

            <div className="text-foreground/80 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                  {profile?.email}
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                  Joined: {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                  })
                  : "N/A"}
              </div>
            </div>
          </div>
          <Button className="text-white Aeonik-medium">Edit Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
}
