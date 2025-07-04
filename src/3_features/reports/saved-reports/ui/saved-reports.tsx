import { Button } from "@shared/ui/button";
import { Star } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@shared/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { useState } from "react";
import { useSavedReportsController } from "../api/controller";
import SavedReportCard from "./saved-report-card";
export default function SavedReports() {
  const [isOpen, setIsOpen] = useState(false);
  const { saved, isSavedReportsLoading } = useSavedReportsController();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Star /> Сохраненные отчеты
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 rounded-xl border-none">
        <Card className="w-full mr-4">
          <CardHeader>
            <CardTitle className="flex flex-row gap-2">
              <Star className="h-5 w-5" /> Сохраненные отчеты
            </CardTitle>
            <CardDescription>
              Применяйте сохраненные отчеты по клику
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto h-full flex flex-col gap-2 ">
            {saved && !isSavedReportsLoading ? (
              saved.map((report, index) => (
                <SavedReportCard
                  data={{ ...report }}
                  key={index}
                  isOpen={isOpen}
                  onOpenChange={setIsOpen}
                />
              ))
            ) : (
              <div>Ничего не найдено</div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
