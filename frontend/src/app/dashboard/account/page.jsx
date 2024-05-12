import { getUserMeLoader } from "@/lib/services/getUser"
import { ProfileForm } from "@/components/ProfileForm";
import { ProfileImageForm } from "@/components/ProfileImageForm";

export default async function AccountRoute() {
  const user = await getUserMeLoader();
  const userData = user.data;
  const userImage = userData?.image;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
  
      <div className="col-span-3">
      <ProfileForm data={userData} />
      </div>
  
      <ProfileImageForm data={userImage} className="col-span-2" />
    </div>
  );
}