import { Card, CardContent, CardTitle, CardHeader } from "@shared/ui/card";
import { ProfileResponse } from "@entities/farmer";
import { Separator } from "@shared/ui/separator";
import { Button } from "@shared/ui/button";
import { ExternalLink, Pencil, User } from "lucide-react";
import { cn } from "@shared/lib/utils";
import { Suspense, useState } from "react";
import useForm from "../model/hook";
import { useSession } from "@entities/session";
import { lazy } from "react";
import Spinner from "@shared/ui/spinner";

const FarmerQuestionnaire = lazy(() => import("./farmer-questionnaire"));

function ProfilePhotoCard({
  photo,
  className,
}: {
  photo?: string;
  className?: string;
}) {
  const hasPhoto = Boolean(photo);

  return (
    <Card
      style={hasPhoto ? { backgroundImage: `url("${photo}")` } : undefined}
      className={cn(
        "relative aspect-square bg-background bg-no-repeat bg-center bg-cover shrink-0",
        className,
      )}
    >
      {!hasPhoto && (
        <div className="absolute inset-0 flex justify-center items-center p-10">
          <User className="text-muted-foreground size-full" strokeWidth={1.5} />
        </div>
      )}
    </Card>
  );
}

export default function FarmerProfileCard({
  profile,
}: {
  profile: ProfileResponse;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const form = useForm();
  const { session } = useSession();

  const handleEdit = () => {
    if (isEdit) {
      form.reset();
    }
    setIsEdit(!isEdit);
  };

  return (
    <>
      {isEdit ? (
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-[calc(100vh-96px)] w-full">
              <Spinner />
            </div>
          }
        >
          <FarmerQuestionnaire
            form={form}
            data={profile}
            handleCancel={handleEdit}
          />
        </Suspense>
      ) : (
        <Card className="w-full gap-4 p-4 max-md:relative max-md:mb-14 max-md:content-box">
          <CardHeader className="grid grid-cols-[1fr_max-content] items-center gap-2 max-md:px-2">
            <CardTitle className="text-2xl font-semibold py-2 max-md:text-xl">
              {profile.organizationName}
            </CardTitle>
            {session?.idUser === Number(profile.idUser) && (
              <Button
                onClick={handleEdit}
                className="max-md:h-10 max-md:fixed max-md:bottom-0 max-md:inset-x-0 max-md:z-10 max-md:mx-6 max-md:mb-6"
              >
                <Pencil /> Редактировать
              </Button>
            )}
            <Separator className="col-span-full" />
          </CardHeader>
          <CardContent className="py-2 max-md:p-0">
            <div className="w-full h-full flex gap-4 max-md:flex-col">
              <div className="w-full h-full flex-col gap-6 hidden max-md:flex items-center max-w-full">
                <ProfilePhotoCard
                  photo={profile.photo}
                  className="size-[150px] rounded-full"
                />
                {profile.kmContacts.length > 0 ? (
                  <div className="w-full h-full flex flex-col gap-2">
                    <span className="font-semibold text-accent text-lg">
                      Контакты КМ
                    </span>
                    {profile.kmContacts.map((contact, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 bg-background p-4 rounded-md w-full h-fit"
                      >
                        <span className="text-muted-foreground text-sm">
                          {contact.position}
                        </span>
                        <span className="text-sm w-fit">{contact.name}</span>
                        <span className="text-sm w-fit">{contact.email}</span>
                        <span className="text-sm w-fit">{contact.phone}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-max flex flex-col gap-1 py-2 px-4 border-accent border-2 rounded-xl">
                    <span className="font-semibold text-accent text-lg">
                      Контакты КМ
                    </span>
                    <span className="text-base font-medium">Не указаны</span>
                  </div>
                )}
              </div>
              <div className="w-full h-full flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-4 w-full h-full max-md:flex max-md:flex-col max-md:gap-2">
                  <span className="text-xl font-semibold w-full col-span-3 text-accent max-md:text-lg">
                    Основная информация
                  </span>
                  {profile.managerName && (
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-muted-foreground">
                        ФИО руководителя
                      </span>
                      <span className="text-base font-medium w-fit max-md:font-normal max-md:text-sm">
                        {profile.managerName}
                      </span>
                    </div>
                  )}
                  {profile.phoneOrganization && (
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-muted-foreground">
                        Телефон организации
                      </span>
                      <span className="text-base font-medium w-fit max-md:font-normal max-md:text-sm">
                        {profile.phoneOrganization}
                      </span>
                    </div>
                  )}
                  {profile.emailOrganization && (
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-muted-foreground">
                        Email организации
                      </span>
                      <span className="text-base font-medium w-fit max-md:font-normal max-md:text-sm">
                        {profile.emailOrganization}
                      </span>
                    </div>
                  )}
                  {profile.nds && (
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-muted-foreground">НДС</span>
                      <span className="text-base font-medium w-fit max-md:font-normal max-md:text-sm">
                        {profile.nds}
                      </span>
                    </div>
                  )}
                  {profile.ogrn && (
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-muted-foreground">
                        ОГРН
                      </span>
                      <span className="text-base font-medium w-fit max-md:font-normal max-md:text-sm">
                        {profile.ogrn}
                      </span>
                    </div>
                  )}
                  {profile.okpo && (
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-muted-foreground">
                        ОКПО
                      </span>
                      <span className="text-base font-medium w-fit max-md:font-normal max-md:text-sm">
                        {profile.okpo}
                      </span>
                    </div>
                  )}
                  {profile.okved && (
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-muted-foreground">
                        ОКВЭД
                      </span>
                      <span className="text-base font-medium w-fit max-md:font-normal max-md:text-sm">
                        {profile.okved}
                      </span>
                    </div>
                  )}
                  {profile.startDateOfCooperation && (
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-muted-foreground">
                        Дата начала сотрудничества
                      </span>
                      <span className="text-base font-medium max-md:font-normal max-md:text-sm">
                        {profile.startDateOfCooperation}
                      </span>
                    </div>
                  )}
                  {profile.dateOfFirstDelivery && (
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-muted-foreground">
                        Дата первой доставки
                      </span>
                      <span className="text-base font-medium max-md:font-normal max-md:text-sm">
                        {profile.dateOfFirstDelivery}
                      </span>
                    </div>
                  )}
                </div>
                {profile.bankDetails && (
                  <div className="w-full h-full flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">
                      Банковские реквизиты
                    </span>
                    <p className="text-base font-medium w-fit max-md:font-normal max-md:text-sm">
                      {profile.bankDetails}
                    </p>
                  </div>
                )}
                {(profile.inn.length > 0 || profile.kpp.length > 0) && (
                  <div className="w-full h-full flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                      {profile.inn.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm w-full text-muted-foreground">
                            ИНН
                          </span>
                          {profile.inn.map((inn, index, array) => (
                            <span
                              key={inn}
                              className="text-base font-medium max-md:font-normal max-md:text-sm"
                            >
                              {inn}
                              {index < array.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      )}
                      {profile.kpp.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm w-full text-muted-foreground">
                            КПП
                          </span>
                          {profile.kpp.map((kpp, index, array) => (
                            <span
                              key={kpp}
                              className="text-base font-medium max-md:font-normal max-md:text-sm"
                            >
                              {kpp}
                              {index < array.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {profile.chiefAccountant && (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">
                      Главный бухгалтер
                    </span>
                    <span className="text-base font-medium w-fit max-md:font-normal max-md:text-sm">
                      {profile.chiefAccountant}
                    </span>
                  </div>
                )}
                {(profile.legalAddress ||
                  profile.postalAddress ||
                  profile.workshopAddress) && (
                  <div className="w-full h-full flex flex-col gap-2 py-4">
                    <span className="text-xl font-semibold w-full text-accent max-md:text-lg">
                      Адреса
                    </span>
                    {profile.legalAddress && (
                      <div className="flex flex-col gap-2">
                        <span className="text-sm text-muted-foreground">
                          Юридический адрес / место жительства
                        </span>
                        <span className="text-base font-medium w-fit max-md:font-normal max-md:text-sm">
                          {profile.legalAddress}
                        </span>
                      </div>
                    )}
                    {profile.postalAddress && (
                      <div className="flex flex-col gap-2">
                        <span className="text-sm text-muted-foreground">
                          Почтовый адрес
                        </span>
                        <span className="text-base font-medium w-fit max-md:font-normal max-md:text-sm">
                          {profile.postalAddress}
                        </span>
                      </div>
                    )}
                    {profile.workshopAddress && (
                      <div className="flex flex-col gap-2">
                        <span className="text-sm text-muted-foreground">
                          Адрес цеха
                        </span>
                        <span className="text-base font-medium w-fit max-md:font-normal max-md:text-sm">
                          {profile.workshopAddress}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                {profile.additionalContacts.length > 0 && (
                  <div className="w-full h-full flex flex-wrap gap-x-4 gap-y-2 py-4">
                    <span className="text-xl font-semibold w-full text-accent max-md:text-lg">
                      Контакты
                    </span>
                    {profile.additionalContacts.map((contact, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 bg-background p-4 rounded-md w-fit h-fit max-md:w-full"
                      >
                        <span className="text-sm text-muted-foreground">
                          {contact.position}
                        </span>
                        <span className="text-sm font-medium w-fit max-md:font-normal max-md:text-sm">
                          {contact.name}
                        </span>
                        <span className="text-sm font-medium w-fit max-md:font-normal max-md:text-sm">
                          {contact.email}
                        </span>
                        <span className="text-sm font-medium w-fit max-md:font-normal max-md:text-sm">
                          {contact.phone}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {profile.declarations.length > 0 && (
                  <div className="flex flex-wrap gap-y-2 gap-x-4 py-4">
                    <span className="text-xl font-semibold w-full text-accent max-md:text-lg">
                      Декларации
                    </span>
                    {profile.declarations.map((declaration, index) => (
                      <a
                        key={index}
                        href={declaration.nameDeclaration || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col gap-1 bg-background p-4 rounded-md w-fit max-md:w-full hover:opacity-80"
                      >
                        <span className="text-base font-medium max-md:font-normal max-md:text-sm text-wrap text-start overflow-hidden">
                          {declaration.nameDeclaration}
                        </span>
                        <span className="text-sm text-muted-foreground text-left">
                          Дата окончания: {declaration.dateEndDeclaration}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
                {profile.agreementUrl && (
                  <div className="flex flex-col gap-2 py-4">
                    <span className="text-xl font-semibold w-full text-accent max-md:text-lg">
                      Договор
                    </span>
                    <Button
                      variant="link"
                      asChild
                      className="w-fit max-w-full px-0 text-foreground whitespace-normal h-auto"
                    >
                      <a
                        href={profile.agreementUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline p-0! break-all"
                      >
                        {profile.agreementUrl}
                        <ExternalLink className="ml-1 inline size-4 align-middle" />
                      </a>
                    </Button>
                  </div>
                )}
                {profile.companyHistory && (
                  <div className="w-full h-full flex flex-col gap-2">
                    <span className="text-xl font-semibold w-full text-accent max-md:text-lg">
                      История компании
                    </span>
                    <div className="flex flex-col gap-2">
                      <span className="text-base font-medium w-fit max-md:font-normal max-md:text-sm">
                        {profile.companyHistory}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full h-full flex flex-col gap-6 max-w-[300px] max-md:hidden">
                <ProfilePhotoCard
                  photo={profile.photo}
                  className="size-[300px]"
                />
                {profile.kmContacts.length > 0 ? (
                  <div className="w-full h-full flex flex-col gap-2">
                    <span className="text-base font-semibold text-accent">
                      Контакты КМ
                    </span>
                    {profile.kmContacts.map((contact, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 bg-background p-4 rounded-md w-full h-fit"
                      >
                        <span className="text-xs text-muted-foreground">
                          {contact.position}
                        </span>
                        <span className="text-sm w-fit">{contact.name}</span>
                        <span className="text-sm w-fit">{contact.email}</span>
                        <span className="text-sm w-fit">{contact.phone}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-max flex flex-col gap-2 p-4 border-accent border-2 rounded-xl">
                    <span className="text-base font-semibold text-accent">
                      Контакты КМ
                    </span>
                    <span className="text-sm font-medium">Не указаны</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
