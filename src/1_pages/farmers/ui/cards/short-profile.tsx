import { Card, CardContent } from "@shared/ui/card";
import { FarmersResponse } from "../../config";
import { ContactsEditModal } from "./contacts-edit-modal";
import { ProfileModal } from "./profile-modal";

export const ShortProfile = ({ farmer }: { farmer: FarmersResponse }) => {
  return (
    <Card>
      <CardContent className="grid grid-cols-[max-content_1fr_1fr_1fr_1fr_max-content] gap-4 items-center">
        <Card
          style={{ backgroundImage: `url(${farmer.photo})` }}
          className="size-[50px] rounded-full aspect-square bg-accent bg-no-repeat bg-center bg-cover shrink-0"
        />
        <span>{farmer.organizationName}</span>
        <span>{farmer.managerName}</span>
        <span>{farmer.phoneOrganization}</span>
        <span>{farmer.emailOrganization}</span>
        <div className="flex items-center gap-1">
          <ContactsEditModal farmer={farmer} />
          <ProfileModal farmer={farmer} />
        </div>
      </CardContent>
    </Card>
  );
};
