import { Card, CardContent } from "@shared/ui/card";
import { FC, useCallback } from "react";
import { MailingChannel } from "@entities/mailing/model/types";
import { Badge } from "@shared/ui/badge";
import { Store } from "lucide-react";
import { Switch } from "@shared/ui/switch";
import { useAdminMailing } from "@entities/mailing/model/api/admin-controller";
import { ChannelEditModal } from "@features/mailing";

interface Props {
  channel: MailingChannel;
}

const typeMap: Record<string, React.ReactNode> = {
  store: <Store className="size-6!" />,
};

export const ChannelCard: FC<Props> = ({ channel }) => {
  const { enableChannel, disableChannel } = useAdminMailing();

  const handleEnableChannel = useCallback(() => {
    enableChannel(Number(channel.id));
  }, [channel.id]);

  const handleDisableChannel = useCallback(() => {
    disableChannel(Number(channel.id));
  }, [channel.id]);

  return (
    <Card>
      <CardContent className="flex flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="default" className="size-12">
            {typeMap[channel.type]}
          </Badge>
          <div className="flex flex-col">
            <span className="text-base font-medium">{channel.name}</span>
            <span className="text-sm text-muted-foreground">
              ID: {channel.idStore}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ChannelEditModal channel={channel} />
          <Switch
            checked={channel.active}
            onCheckedChange={
              channel.active ? handleDisableChannel : handleEnableChannel
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};
