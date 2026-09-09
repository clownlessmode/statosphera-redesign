import { FC } from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@shared/ui/card";
import { Badge } from "@shared/ui/badge";
import { EXTERNAL_RESOURCES } from "../config/constants";

const getHostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

interface Props {
  resource: (typeof EXTERNAL_RESOURCES)[number];
}

export const ResourceCard: FC<Props> = ({ resource }) => {
  const Icon = resource.icon;

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <Card className="h-full cursor-pointer transition-all duration-300 group-hover:border-foreground/50 group-hover:scale-102">
        <CardHeader className="h-full gap-2">
          <div className="flex items-start justify-between gap-4">
            <Badge className="size-max p-2">
              <Icon className="size-5!" />
              {resource.source}
            </Badge>
            <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:size-5" />
          </div>
          <CardTitle className="text-lg leading-snug">
            {resource.title}
          </CardTitle>
          <CardDescription className="truncate">
            {getHostname(resource.url)}
          </CardDescription>
        </CardHeader>
      </Card>
    </a>
  );
};
