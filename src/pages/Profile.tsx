import ProfileHeader from "@/feature/users/component/profile-header.tsx";
import ProfileContent from "@/feature/users/component/profile-content.tsx";

function Profile() {
    return (
        <section className={"flex flex-col p-5 h-full overflow-y-auto w-full "}>
     <div className="max-w-3xl flex gap-3 flex-col ">
         <ProfileHeader/>
         <ProfileContent/>
     </div>
        </section>
    );
}

export default Profile;