import { Header } from "@widgets/header";
import { EXTERNAL_RESOURCES } from "../config/constants";
import { ResourceCard } from "./resource-card";

const Resources = () => {
  const groupedResources = EXTERNAL_RESOURCES.reduce<
    { category: string; items: typeof EXTERNAL_RESOURCES }[]
  >((groups, resource) => {
    const group = groups.find((item) => item.category === resource.category);
    if (group) {
      group.items.push(resource);
    } else {
      groups.push({ category: resource.category, items: [resource] });
    }
    return groups;
  }, []);

  return (
    <div className="bg-muted min-h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Сторонние ресурсы" />
      <div className="rounded-3xl min-h-[calc(100vh-64px)] bg-background p-4 md:p-6 flex flex-col gap-6">
        {groupedResources.map((group) => (
          <section key={group.category} className="flex flex-col gap-3">
            <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              {group.category}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {group.items.map((resource) => (
                <ResourceCard key={resource.url} resource={resource} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Resources;
