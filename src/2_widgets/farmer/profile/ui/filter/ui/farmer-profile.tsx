import { Card, CardContent, CardTitle, CardHeader } from "@shared/ui/card";
import { ProfileResponse } from "@entities/farmer";
import { Separator } from "@shared/ui/separator";
import { Button } from "@shared/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import FarmerQuestionnaire from "./farmer-questionnaire";
import useForm from "../model/hook";

export default function FarmerProfileCard({
  profile,
}: {
  profile: ProfileResponse;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const form = useForm();

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <>
      {isEdit ? (
        <FarmerQuestionnaire
          form={form}
          data={profile}
          handleCancel={handleEdit}
        />
      ) : (
        <Card className="w-full gap-4 p-4">
          <CardHeader className="flex flex-wrap justify-between items-center gap-2">
            <CardTitle className="text-2xl font-semibold py-2">
              {profile.organizationName}
            </CardTitle>
            <Button onClick={handleEdit}>
              <Pencil /> Редактировать
            </Button>
            <Separator />
          </CardHeader>
          <CardContent className="py-2">
            <div className="w-full h-full flex gap-4">
              <div className="w-full h-full flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-4 w-full h-full">
                  <span className="text-xl font-semibold w-full col-span-3 text-accent">
                    Основная информация
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">
                      ФИО руководителя
                    </span>
                    <span className="text-base font-medium w-fit">
                      {profile.managerName}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">
                      Телефон организации
                    </span>
                    <span className="text-base font-medium w-fit">
                      {profile.phoneOrganization}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">
                      Email организации
                    </span>
                    <span className="text-base font-medium w-fit">
                      {profile.emailOrganization}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">НДС</span>
                    <span className="text-base font-medium w-fit">
                      {profile.nds ? `${profile.nds}%` : "-"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">ОГРН</span>
                    <span className="text-base font-medium w-fit">
                      {profile.ogrn}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">ОКПО</span>
                    <span className="text-base font-medium w-fit">
                      {profile.okpo ? profile.okpo : "-"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">ОКВЭД</span>
                    <span className="text-base font-medium w-fit">
                      {profile.okved}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">
                      Дата начала сотрудничества
                    </span>
                    <span className="text-base font-medium">
                      {profile.startDateOfCooperation
                        ? profile.startDateOfCooperation
                        : "-"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">
                      Дата первой доставки
                    </span>
                    <span className="text-base font-medium">
                      {profile.dateOfFirstDelivery
                        ? profile.dateOfFirstDelivery
                        : "-"}
                    </span>
                  </div>
                </div>
                <div className="w-full h-full flex flex-col gap-2">
                  <span className="text-sm text-muted-foreground">
                    Банковские реквизиты
                  </span>
                  <p className="text-base font-medium w-fit">
                    {profile.bankDetails}
                  </p>
                </div>
                <div className="w-full h-full flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm w-full text-muted-foreground">
                        ИНН
                      </span>
                      {profile.inn.map((inn, index, array) => (
                        <span key={inn} className="text-base font-medium">
                          {inn}
                          {index < array.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm w-full text-muted-foreground">
                        КПП
                      </span>
                      {profile.kpp.length > 0 ? (
                        profile.kpp.map((kpp, index, array) => (
                          <span key={kpp} className="text-base font-medium">
                            {kpp}
                            {index < array.length - 1 && ", "}
                          </span>
                        ))
                      ) : (
                        <span className="text-base font-medium">-</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full h-full flex flex-col gap-2 py-4">
                  <span className="text-xl font-semibold w-full text-accent">
                    Адреса
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">
                      Юридический адрес
                    </span>
                    <span className="text-base font-medium w-fit">
                      {profile.legalAddress}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">
                      Почтовый адрес
                    </span>
                    <span className="text-base font-medium w-fit">
                      {profile.postalAddress}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">
                      Адрес цеха
                    </span>
                    <span className="text-base font-medium w-fit">
                      {profile.workshopAddress}
                    </span>
                  </div>
                </div>
                <div className="w-full h-full flex flex-wrap gap-x-4 gap-y-2 py-4">
                  <span className="text-xl font-semibold w-full text-accent">
                    Контакты
                  </span>
                  <div className="flex flex-col gap-2 bg-background p-4 rounded-md w-fit h-fit">
                    <span className="text-sm text-muted-foreground">
                      Главный бухгалтер
                    </span>
                    <span className="text-base font-medium w-fit">
                      {profile.chiefAccountant.name}
                    </span>
                    <span className="text-sm font-medium w-fit">
                      {profile.responsiblePerson.email}
                    </span>
                    <span className="text-sm font-medium w-fit">
                      {profile.responsiblePerson.phone}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 bg-background p-4 rounded-md w-fit h-fit">
                    <span className="text-sm text-muted-foreground">
                      Ответвенное лицо
                    </span>
                    <span className="text-base font-medium w-fit">
                      {profile.responsiblePerson.name}
                    </span>
                    <span className="text-sm font-medium w-fit">
                      {profile.responsiblePerson.email}
                    </span>
                    <span className="text-sm font-medium w-fit">
                      {profile.responsiblePerson.phone}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 bg-background p-4 rounded-md w-fit h-fit">
                    <span className="text-sm text-muted-foreground">
                      {profile.mainContact.position}
                    </span>
                    <span className="text-base font-medium w-fit">
                      {profile.mainContact.name}
                    </span>
                    <span className="text-sm font-medium w-fit">
                      {profile.mainContact.email}
                    </span>
                    <span className="text-sm font-medium w-fit">
                      {profile.mainContact.phone}
                    </span>
                  </div>
                  {profile.additionalContacts.length > 0 &&
                    profile.additionalContacts.map((contact, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 bg-background p-4 rounded-md w-fit h-fit"
                      >
                        <span className="text-sm text-muted-foreground">
                          {contact.position}
                        </span>
                        <span className="text-sm font-medium w-fit">
                          {contact.name}
                        </span>
                        <span className="text-sm font-medium w-fit">
                          {contact.email}
                        </span>
                        <span className="text-sm font-medium w-fit">
                          {contact.phone}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="flex flex-wrap gap-y-2 gap-x-4 py-4">
                  <span className="text-xl font-semibold w-full text-accent">
                    Декларации
                  </span>
                  {profile.declarations.length > 0 ? (
                    profile.declarations.map((declaration) => (
                      <div
                        key={declaration.nameDeclaration}
                        className="flex flex-col gap-1 bg-background p-4 rounded-md w-fit"
                      >
                        <span className="text-base font-medium">
                          {declaration.nameDeclaration}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Дата окончания: {declaration.dateEndDeclaration}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-base font-medium">-</span>
                  )}
                </div>
                <div className="w-full h-full flex flex-col gap-2">
                  <span className="text-xl font-semibold w-full text-accent">
                    История компании
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="text-base font-medium w-fit">
                      {profile.companyHistory}
                    </span>
                  </div>
                </div>
              </div>
              <Card
                style={{
                  backgroundImage: `url(${profile.photo})`,
                }}
                className="size-[300px] aspect-square bg-background bg-no-repeat bg-center bg-cover shrink-0"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
