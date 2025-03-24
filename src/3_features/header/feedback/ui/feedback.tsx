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
const Feedback = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MessageSquareWarning className="w-4 h-4" />
          <p className="hidden lg:block">Обратная связь</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Обратная связь</DialogTitle>
          <DialogDescription>
            Свяжитесь с нами, чтобы сообщить о проблеме или предложить
            улучшения.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="error" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
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
            <ErrorForm />
          </TabsContent>
          <TabsContent value="suggestion">
            <SuggestionForm />
          </TabsContent>
          <TabsContent value="other">
            <OtherForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default Feedback;
