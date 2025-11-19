import { FarmerProfile } from "@widgets/farmer/ui/filter";
//import { Header } from "@widgets/header";
import { FC } from "react";

const Farmer: FC = () => {
  return (
    <div className="bg-muted h-full w-full p-2 flex flex-col">
      {/*<Header title="Фермер" />*/}
      <div className="rounded-3xl bg-background flex flex-col items-center h-full p-4">
        <FarmerProfile />
      </div>
    </div>
  );
};

export default Farmer;
