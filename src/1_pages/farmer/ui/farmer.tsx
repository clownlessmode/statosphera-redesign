import { Button } from "@shared/ui/button";
import { FarmerProfile } from "@widgets/farmer/ui/filter";
import { FC, useState } from "react";
import useForm from "@widgets/farmer/ui/filter/model/hook";
import { toast } from "sonner";
import { useFarmer } from "../api/controller";
import { useFarmerProfileStore } from "@widgets/farmer/model/filters-store";
import { useSession } from "@entities/session";
import { useNavigate } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";

const STEPS_FIELDS = [
  // Шаг 0: Основная информация
  [
    "photo",
    "organizationName",
    "managerName",
    "phoneOrganization",
    "emailOrganization",
    "inn",
    "personalization",
    "bankDetails",
    "companyHistory",
  ],
  // Шаг 1: Дополнительные информация и адреса
  ["legalAddress", "postalAddress", "workshopAddress", "ogrn", "okved"],
  // Шаг 2: Контакты
  ["chiefAccountant", "responsiblePerson", "mainContact"],
];

const Farmer: FC = () => {
  const [level, setLevel] = useState<number>(0);
  const { createProfile, uploadPhoto } = useFarmer();
  const { getApiPayload } = useFarmerProfileStore();
  const navigate = useNavigate();
  const form = useForm();
  const { session } = useSession();
  console.log(getApiPayload());

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
            idUser: session.idUser,
          });
          await uploadPhoto({ photo: photo[0] });
          toast.success("Профиль успешно создан");
          navigate(ROUTES_PATH.DASHBOARD);
        } catch (err: any) {
          console.error(err);
          toast.error(`${err.response.data.message}`);
        }
      } else {
        toast.error("Ошибка при создании профиля");
      }
    } else {
      toast.error("Заполните обязательные поля");
    }
  };

  return (
    <div className="bg-muted h-full w-full p-2 flex flex-col">
      <div className="rounded-3xl bg-background flex flex-col items-center justify-center min-h-screen max-h-max p-4">
        <div className="w-max flex flex-col gap-4">
          <FarmerProfile level={level} form={form} />
          <div className="w-full flex flex-row gap-2 justify-end">
            {level > 0 && <Button onClick={handleBack}>Назад</Button>}
            {level < 2 && <Button onClick={handleNext}>Далее</Button>}
            {level === 2 && <Button onClick={handleSubmit}>Отправить</Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farmer;
