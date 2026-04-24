import { useNewApiContext } from "#/modules/dashboard/project/NewApiKeyWrapper";
import Project from "#/modules/dashboard/project/Project";
import { createFileRoute } from "@tanstack/react-router";
import type { Id } from "convex/_generated/dataModel";

export const Route = createFileRoute("/(authed)/dashboard/$projectId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = Route.useParams();
  const { newApiKey } = useNewApiContext();

  return <Project projectId={projectId as Id<"projects">} apiKey={newApiKey} />;
}
