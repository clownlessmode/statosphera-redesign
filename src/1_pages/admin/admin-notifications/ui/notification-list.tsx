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
  Eye,
  EyeOff,
  Search,
  Filter,
  Calendar,
} from "lucide-react";
import { useAdminNotifications } from "@entities/notifications";
import { ALERT_EMOTIONS } from "@entities/alert-emotions";
import { getBadgeVariantFromLabel } from "@pages/notifications/ui/mail-list";
import { cn } from "@shared/lib/utils";
import { toast } from "sonner";

interface NotificationListProps {
  onEdit?: (notification: any) => void;
}

export const NotificationList = ({ onEdit }: NotificationListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmotion, setFilterEmotion] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState<
    number | null
  >(null);

  const {
    notifications,
    isNotificationsLoading,
    deleteNotification,
    readNotification,
    isDeleting,
    isReading,
  } = useAdminNotifications();

  const filteredNotifications =
    notifications?.filter((notification) => {
      const matchesSearch =
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesEmotion =
        !filterEmotion || notification.emotion === filterEmotion;
      return matchesSearch && matchesEmotion;
    }) || [];

  const handleDelete = async () => {
    if (!notificationToDelete) return;

    try {
      await deleteNotification(notificationToDelete);
      toast.success("Уведомление удалено");
      setDeleteDialogOpen(false);
      setNotificationToDelete(null);
    } catch {
      toast.error("Ошибка при удалении уведомления");
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await readNotification(id);
      toast.success("Уведомление отмечено как прочитанное");
    } catch {
      toast.error("Ошибка при обновлении статуса");
    }
  };

  const openDeleteDialog = (id: number) => {
    setNotificationToDelete(id);
    setDeleteDialogOpen(true);
  };

  if (isNotificationsLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-muted-foreground">Загрузка уведомлений...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="flex flex-col gap-4">
        <CardHeader>
          <CardTitle>Управление уведомлениями</CardTitle>
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
                  Эмоция
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterEmotion("")}>
                  Все эмоции
                </DropdownMenuItem>
                {Object.entries(ALERT_EMOTIONS).map(([key, value]) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => setFilterEmotion(key)}
                  >
                    <Badge
                      variant={getBadgeVariantFromLabel(key)}
                      className="mr-2"
                    >
                      {value}
                    </Badge>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Notifications List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                {notifications?.length === 0
                  ? "Уведомления не найдены"
                  : "Нет уведомлений, соответствующих фильтрам"}
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-colors",
                    notification.is_read ? "bg-muted/50" : "bg-background",
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium truncate">
                        {notification.title}
                      </h4>
                      {notification.is_important && (
                        <Badge variant="destructive" className="text-xs">
                          Важное
                        </Badge>
                      )}
                      {!notification.is_read && (
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {notification.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={getBadgeVariantFromLabel(notification.emotion)}
                      >
                        {ALERT_EMOTIONS[notification.emotion] ||
                          notification.emotion}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(notification.created_at).toLocaleString()}
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
                      <DropdownMenuItem onClick={() => onEdit?.(notification)}>
                        Редактировать
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleMarkAsRead(notification.id)}
                        disabled={isReading}
                      >
                        {notification.is_read ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-2" />
                            Отметить как непрочитанное
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Отметить как прочитанное
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openDeleteDialog(notification.id)}
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
            <AlertDialogTitle>Удалить уведомление?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Уведомление будет удалено навсегда.
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
