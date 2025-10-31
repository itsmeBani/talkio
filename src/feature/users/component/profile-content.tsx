
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";

import Account from "@/feature/users/component/user-settings/account.tsx";
import Personal from "@/feature/users/component/user-settings/personal.tsx";
import Security from "@/feature/users/component/user-settings/security.tsx";


export default function ProfileContent() {

  return (
    <Tabs defaultValue="personal" className="space-y-6">
      <TabsList className="grid w-full Aeonik-regular grid-cols-4">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>

      </TabsList>


      <TabsContent value="personal" className="space-y-6 Aeonik-regular">
       <Personal/>
      </TabsContent>


      <TabsContent value="account" className="space-y-6 Aeonik-regular">
       <Account/>
      </TabsContent>


      <TabsContent value="security" className="space-y-6 Aeonik-regular">
       <Security/>
      </TabsContent>



    </Tabs>
  );
}
