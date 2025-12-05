import { Button } from "@shared/ui/button";
import { FarmerQuestionnaire } from "@widgets/farmer/profile/ui/filter";
import { FC, useEffect, useState } from "react";
import useForm from "@widgets/farmer/profile/ui/filter/model/hook";
import { toast } from "sonner";
import { useFarmer } from "@entities/farmer";
import { useFarmerProfileStore } from "@widgets/farmer/profile/model/profile-store";
import { useSession } from "@entities/session";
import FarmerProfileCard from "@widgets/farmer/profile/ui/filter/ui/farmer-profile";
import { ProfileResponse } from "@entities/farmer";
import { Header } from "@widgets/header";
import Spinner from "@shared/ui/spinner";
import { STEPS_FIELDS } from "@widgets/farmer/profile/ui/filter/config/constant";
import formatDateIso from "@shared/lib/format-date-iso";

const FarmerProfile: FC = () => {
  const [level, setLevel] = useState<number>(0);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const { session } = useSession();
  const {
    createProfile,
    uploadPhoto,
    checkProfile,
    profile: profileData,
    profileStatus,
    isCheckProfileLoading,
  } = useFarmer(session?.idUser);
  const { getApiPayload } = useFarmerProfileStore();
  const form = useForm();

  useEffect(() => {
    if (profileData && profileStatus) {
      setProfile(profileData);
    }
  }, [profileData, profileStatus]);

  const handleNext = async () => {
    const fields = STEPS_FIELDS[level];
    // trigger вернет true, если все переданные поля валидны
    const isStepValid = await form.trigger(fields as any);

    if (isStepValid) {
      setLevel((prev) => prev + 1);
    } else {
      toast.error("Заполните обязательные поля");
    }
  };

  const handleBack = () => {
    setLevel((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = async () => {
    const isStepValid = await form.trigger();

    if (isStepValid && session?.idUser) {
      const { photo, ...payloadWithoutPhoto } = getApiPayload();
      if (photo && photo.length > 0) {
        try {
          await createProfile({
            ...payloadWithoutPhoto,
            startDateOfCooperation: payloadWithoutPhoto.startDateOfCooperation
              ? formatDateIso(payloadWithoutPhoto.startDateOfCooperation)
              : null,
            dateOfFirstDelivery: payloadWithoutPhoto.dateOfFirstDelivery
              ? formatDateIso(payloadWithoutPhoto.dateOfFirstDelivery)
              : null,
            declarations: payloadWithoutPhoto.declarations?.map((d: any) => ({
              ...d,
              dateEndDeclaration: formatDateIso(d.dateEndDeclaration),
            })),
            idUser: session.idUser,
          });
          await uploadPhoto({ photo: photo[0] });
          toast.success("Профиль успешно создан");
          checkProfile();
        } catch (error: any) {
          console.error(error);
          toast.error(`${error.response.data.message}`);
        }
      } else {
        toast.error("Ошибка при создании профиля");
      }
    } else {
      toast.error("Заполните обязательные поля");
    }
  };

  if (isCheckProfileLoading) {
    return (
      <div className="bg-muted h-screen w-full p-2 flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-muted h-full w-full p-2 flex flex-col max-w-full gap-2">
      <Header title={profileStatus && profile ? "Профиль" : "Анкета"} />
      {!profileStatus && (
        <div className="rounded-3xl bg-background flex flex-col items-center justify-center min-h-screen max-h-max p-4">
          <div className="w-max flex flex-col gap-4 max-md:w-full">
            <FarmerQuestionnaire level={level} form={form} />
            <div className="w-full flex flex-row gap-2 justify-end">
              {level === 0 && <Button onClick={handleNext}>Далее</Button>}
              {level === 1 && <Button onClick={handleBack}>Назад</Button>}
              {level === 1 && <Button onClick={handleSubmit}>Отправить</Button>}
            </div>
          </div>
        </div>
      )}
      {profileStatus && profile && (
        <div className="rounded-3xl bg-background h-full w-full p-4 flex flex-col gap-4">
          <FarmerProfileCard profile={profile} />
        </div>
      )}
    </div>
  );
};

export default FarmerProfile;
