import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { Label } from "@shared/ui/label";
import { Input } from "@shared/ui/input";
import { MessageSquareWarning } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";
import ErrorForm from "./error-form";

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
            <TabsTrigger value="error">Ошибка</TabsTrigger>
            <TabsTrigger value="suggestion">Предложение</TabsTrigger>
            <TabsTrigger value="other">Другое</TabsTrigger>
          </TabsList>
          <TabsContent value="error">
            <ErrorForm />
          </TabsContent>
          <TabsContent value="suggestion">suggestion</TabsContent>
          <TabsContent value="other">other</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default Feedback;
