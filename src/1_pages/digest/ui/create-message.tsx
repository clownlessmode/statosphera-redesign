import { useIsMobile } from "@shared/hooks/use-mobile";
import { Button } from "@shared/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
interface Props {
  id: string;
  description: string;
}
const CreateMessage = ({ id, description }: Props) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <MessageCircle />
          Оставить отзыв {!isMobile && "по дайджесту"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Оставить отзыв</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <CardContent className="p-0">
          <CardHeader>
            <CardTitle>О вас {id}</CardTitle>
            <CardDescription>≠</CardDescription>
          </CardHeader>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMessage;
