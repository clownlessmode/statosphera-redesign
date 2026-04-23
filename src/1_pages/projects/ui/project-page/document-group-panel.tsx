import { useGetDocuments } from "@pages/projects/api/controller";
import { GroupNestedList } from "./components/group-nested-list";
import { GroupNestedListSkeleton } from "./components/group-nested-list-skeleton";
import { ProjectDocumentItem } from "./components/project-document-item";

type Props = {
  id_project: number;
  group_id: number;
  isOpen: boolean;
};

export function DocumentGroupPanel({ id_project, group_id, isOpen }: Props) {
  const {
    data: documents,
    isPending,
    isError,
  } = useGetDocuments(id_project, group_id, { enabled: isOpen });

  if (isPending) {
    return <GroupNestedListSkeleton />;
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive pl-2">
        Не удалось загрузить документы.
      </p>
    );
  }

  if (!documents?.length) {
    return (
      <p className="text-sm text-muted-foreground pl-2">
        В группе пока нет документов.
      </p>
    );
  }

  return (
    <GroupNestedList>
      {documents.map((doc) => (
        <ProjectDocumentItem
          key={doc.id}
          document={doc}
          id_project={id_project}
        />
      ))}
    </GroupNestedList>
  );
}
