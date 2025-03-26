import { Header } from "@widgets/header";
import { mails } from "../data";

import { accounts } from "../data";
import { Mails } from "./mail";

const Notifications = () => {
  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Уведомления" />
      <div className="rounded-3xl bg-background gap-4">
        <Mails
          accounts={accounts}
          mails={mails}
          defaultLayout={undefined}
          defaultCollapsed={undefined}
          navCollapsedSize={4}
        />
      </div>
    </div>
  );
};

export default Notifications;
