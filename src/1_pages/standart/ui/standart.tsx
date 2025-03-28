import { Header } from "@widgets/header";
import { useParams } from "react-router";

import { File } from "lucide-react";

import { useIsMobile } from "@shared/hooks/use-mobile";
import { standartsMock } from "@shared/constants/mock/standarts-mock";

import { Badge } from "@shared/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui/accordion";
import { Separator } from "@shared/ui/separator";

const Standart = () => {
  const isMobile = useIsMobile();
  const { id } = useParams<{ id: string | undefined }>();
  const standart = id
    ? standartsMock.find((standart) => standart.id.toString() === id)
    : undefined;

  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
      <Header title={`${!isMobile ? standart?.name_standard : ""}`} />
      <div className="rounded-3xl bg-background p-4 gap-4 h-full flex flex-col lg:flex-row-reverse">
        <Accordion
          type="single"
          collapsible
          className="bg-muted h-fit px-2 rounded-md w-full max-w-[300px]"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex justify-start items-center gap-1">
                <div className="flex flex-row items-center gap-1">
                  <File className="size-4 text-muted-foreground" />
                  Файлы
                </div>
                <div>
                  <Badge>{standart?.links?.length}</Badge>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="flex flex-col gap-1">
              <Separator />
              {standart?.links?.map((link) => (
                <>
                  <a
                    href={link.full_path}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.nameFiles}
                  </a>
                  <Separator />
                </>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Standart;

//  <Accordion
//    type="single"
//    className="flex flex-col static lg:sticky top-4 text-start items-start h-fit w-full lg:w-fit"
//  >
//    <AccordionItem value="all" className="w-full justify-between gap-4">
//      <AccordionTrigger className="flex flex-row gap-2 items-center">

//      </AccordionTrigger>
//    </AccordionItem>
//    <TabsTrigger value="all" className="w-full justify-between gap-4">
//      <div className="flex flex-row gap-2 items-center">
//        <Video className="size-4 text-muted-foreground" />
//        Видео
//      </div>
//      <Badge>{standart?.attachedVideo}</Badge>
//    </TabsTrigger>
//    <TabsTrigger value="all" className="w-full justify-between gap-4">
//      <div className="flex flex-row gap-2 items-center">
//        <Camera className="size-4 text-muted-foreground" />
//        Фото
//      </div>
//      <Badge>{standart?.attachedPhoto}</Badge>
//    </TabsTrigger>
//  </Accordion>;
