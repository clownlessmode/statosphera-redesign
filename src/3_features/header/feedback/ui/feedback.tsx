import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";

import { MessageSquareWarning } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";
import ErrorForm from "./error-form";
import { Separator } from "@shared/ui/separator";
import SuggestionForm from "./suggestion-form";
import OtherForm from "./other-form";
import { useState } from "react";
import { VERSION } from "@shared/constants/config";

const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MessageSquareWarning className="w-4 h-4" />
          <p className="hidden lg:block">Обратная связь</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-md:h-max">
        <DialogHeader>
          <DialogTitle className="justify-between w-full flex">
            <span>Обратная связь</span>
            <span className="text-muted-foreground text-xs font-light mr-4">
              Версия приложения: {VERSION}{" "}
            </span>
          </DialogTitle>
          <DialogDescription>
            Свяжитесь с нами, чтобы сообщить о проблеме или предложить
            улучшения.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="error" className="w-full">
          <TabsList className="grid h-min w-full rounded-lg grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="error" className="sm:text-sm text-xs">
              Ошибка
            </TabsTrigger>
            <TabsTrigger value="suggestion" className="sm:text-sm text-xs">
              Предложение
            </TabsTrigger>
            <TabsTrigger value="other" className="sm:text-sm text-xs">
              Другое
            </TabsTrigger>
          </TabsList>
          <Separator className="my-2" />
          <TabsContent value="error">
            <ErrorForm setIsOpen={setIsOpen} />
          </TabsContent>
          <TabsContent value="suggestion">
            <SuggestionForm setIsOpen={setIsOpen} />
          </TabsContent>
          <TabsContent value="other">
            <OtherForm setIsOpen={setIsOpen} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default Feedback;
