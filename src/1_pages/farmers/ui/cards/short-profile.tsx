import { Card, CardContent } from "@shared/ui/card";
import { FarmersResponse } from "../../config";
import { ContactsEditModal } from "./contacts-edit-modal";
import { ProfileModal } from "./profile-modal";
import { cn } from "@shared/lib/utils";

export const ShortProfile = ({ farmer }: { farmer: FarmersResponse }) => {
  return (
    <Card
      className={cn(farmer.kmContacts.length === 0 && "border-accent border-2")}
    >
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
  );
};
