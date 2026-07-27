import { FC } from "react";
import { useFarmer } from "@entities/farmer";
import { useSession } from "@entities/session";
import FarmerProfileCard from "@widgets/farmer/profile/ui/filter/ui/farmer-profile";
import { Header } from "@widgets/header";
import Spinner from "@shared/ui/spinner";

const FarmerProfile: FC = () => {
  const { session } = useSession();
  const { profile, isGetProfileLoading } = useFarmer(
    session?.idUser,
    session?.role,
  );

  if (isGetProfileLoading) {
    return (
      <div className="bg-muted h-screen w-full p-2 flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-muted h-full w-full p-2 flex flex-col max-w-full gap-2">
      <Header title="Профиль" />
      {profile && (
        <div className="rounded-3xl bg-background h-full w-full p-4 flex flex-col gap-4">
          <FarmerProfileCard profile={profile} />
        </div>
      )}
    </div>
  );
};

export default FarmerProfile;
