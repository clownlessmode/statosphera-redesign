import { useAdminMailing } from "@entities/mailing";
import { ChannelCard } from "./channel-card";
import { Header } from "@widgets/header";
import { useMemo } from "react";
import { ChannelAddModal } from "@features/mailing";

export const AdminMailing = () => {
  const channelsDto = useMemo(() => ({ idStore: [], types: [] }), []);
  const { channels, isGettingChannels } = useAdminMailing(channelsDto);

  if (isGettingChannels) {
    return (
      <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
        <Header title="Управление ролями" />
        <div className="rounded-3xl px-4 py-4 gap-4 h-full flex flex-1 w-full bg-background overflow-y-auto">
          <div className="flex items-center justify-center h-64 w-full">
            <div className="text-lg">Загрузка...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title="Рассылка в каналы"
        actions={{
          right: <ChannelAddModal />,
        }}
      />
      <div className="rounded-3xl px-4 py-4 gap-4 h-full flex flex-col flex-1 w-full bg-background overflow-y-auto">
        {channels?.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>
    </div>
  );
};
