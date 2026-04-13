import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import { Badge } from "@shared/ui/badge";
import { Input } from "@shared/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@shared/ui/alert-dialog";
import {
  MoreHorizontal,
  Trash2,
  Search,
  Filter,
  Calendar,
  Eye,
  Pencil,
} from "lucide-react";
import { useDigests, useAdminDigests } from "@entities/digests";

import { toast } from "sonner";

interface DigestListProps {
  onEdit?: (digest: any) => void;
}

const typeMap: Record<string, string> = {
  analytics: "Аналитика",
  director: "Совет директоров",
  franchise: "Франчайзинг",
  groupCompany: "Группа компаний",
  farmers: "Фермеры",
};

const getBadgeVariantFromType = (type: string) => {
  switch (type) {
    case "analytics":
      return "default";
    case "director":
      return "secondary";
    case "franchise":
      return "outline";
    case "groupCompany":
      return "destructive";
    default:
      return "default";
  }
};

export const DigestList = ({ onEdit }: DigestListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [digestToDelete, setDigestToDelete] = useState<string | null>(null);

  const { digests, isDigestsLoading } = useDigests();
  const { deleteDigest, isDeleting } = useAdminDigests();

  const filteredDigests =
    digests?.filter((digest) => {
      const matchesSearch =
        digest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        digest.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !filterType || digest.type === filterType;
      return matchesSearch && matchesType;
    }) || [];

  const handleDelete = async () => {
    if (!digestToDelete) return;

    try {
      await deleteDigest(digestToDelete);
      setDeleteDialogOpen(false);
      setDigestToDelete(null);
    } catch {
      toast.error("Ошибка при удалении дайджеста");
    }
  };

  const openDeleteDialog = (id: string) => {
    setDigestToDelete(id);
    setDeleteDialogOpen(true);
  };

  if (isDigestsLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-muted-foreground">Загрузка дайджестов...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="flex flex-col gap-4 ">
        <CardHeader>
          <CardTitle>Управление дайджестами</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по заголовку или описанию..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Тип
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterType("")}>
                  Все типы
                </DropdownMenuItem>
                {Object.entries(typeMap).map(([key, value]) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => setFilterType(key)}
                  >
                    <Badge
                      variant={getBadgeVariantFromType(key)}
                      className="mr-2"
                    >
                      {value}
                    </Badge>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Digests List */}
          <div className="space-y-2 overflow-y-auto">
            {filteredDigests.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                {digests?.length === 0
                  ? "Дайджесты не найдены"
                  : "Нет дайджестов, соответствующих фильтрам"}
              </div>
            ) : (
              filteredDigests.map((digest) => (
                <div
                  key={digest.id}
                  className="flex items-center justify-between p-3 rounded-lg border transition-colors bg-background"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium truncate">{digest.title}</h4>
                      <Badge
                        variant={getBadgeVariantFromType(digest.type)}
                        className="text-xs"
                      >
                        {typeMap[digest.type] || digest.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {digest.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {digest.count} страниц
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(digest.create_add).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit?.(digest)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Редактировать
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openDeleteDialog(digest.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Удалить
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить дайджест?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Дайджест будет удален навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Удаление..." : "Удалить"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
