import { Card, CardContent } from "@shared/ui/card";
import { FarmersResponse } from "../../config";
import { ContactsEditModal } from "./contacts-edit-modal";
import { ProfileModal } from "./profile-modal";
import { Tooltip, TooltipTrigger, TooltipContent } from "@shared/ui/tooltip";

export const ShortProfile = ({ farmer }: { farmer: FarmersResponse }) => {
  console.log(farmer);
  return (
    <>
      {farmer.kmContacts.length === 0 ? (
        <Card className="border-accent border-2">
          <Tooltip>
            <TooltipTrigger className="ml-1" asChild>
              <CardContent className="grid grid-cols-[max-content_1fr_1fr_1fr_1fr_max-content] gap-4 items-center max-md:grid-cols-[max-content_1fr_max-content]">
                <Card
                  style={{ backgroundImage: `url(${farmer.photo})` }}
                  className="size-[50px] rounded-full aspect-square bg-accent bg-no-repeat bg-center bg-cover shrink-0"
                />
                <span className="truncate">{farmer.organizationName}</span>
                <span className="truncate max-md:hidden">
                  {farmer.managerName}
                </span>
                <span className="truncate max-md:hidden">
                  {farmer.phoneOrganization}
                </span>
                <span className="truncate max-md:hidden">
                  {farmer.emailOrganization}
                </span>
                <div className="flex items-center gap-1">
                  <ContactsEditModal farmer={farmer} />
                  <ProfileModal farmer={farmer} />
                </div>
              </CardContent>
            </TooltipTrigger>
            <TooltipContent
              sideOffset={16}
              className="w-max h-fit p-3 text-center flex flex-col"
              side="top"
            >
              <span>Не указаны контакты КМ.</span>
            </TooltipContent>
          </Tooltip>
        </Card>
      ) : (
        <Card>
          <CardContent className="grid grid-cols-[max-content_1fr_1fr_1fr_1fr_max-content] gap-4 items-center max-md:grid-cols-[max-content_1fr_max-content]">
            <Card
              style={{ backgroundImage: `url(${farmer.photo})` }}
              className="size-[50px] rounded-full aspect-square bg-accent bg-no-repeat bg-center bg-cover shrink-0"
            />
            <span className="truncate">{farmer.organizationName}</span>
            <span className="truncate max-md:hidden">{farmer.managerName}</span>
            <span className="truncate max-md:hidden">
              {farmer.phoneOrganization}
            </span>
            <span className="truncate max-md:hidden">
              {farmer.emailOrganization}
            </span>
            <div className="flex items-center gap-1">
              <ContactsEditModal farmer={farmer} />
              <ProfileModal farmer={farmer} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
