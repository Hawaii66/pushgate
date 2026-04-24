import { Button } from "#/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "#/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "#/components/ui/empty";
import { useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import CreateProjectDialog from "./CreateProjectDialog";

export default function ProjectList() {
  const projects = useQuery(api.project.list);
  const navigate = useNavigate();

  if (projects === undefined) {
    return null;
  }

  if (projects.length === 0) {
    return <EmptyProjects />;
  }

  return (
    <div className="p-4">
      <div className="gap-4 grid grid-cols-3 pb-4">
        {projects.map((i) => (
          <Card>
            <CardHeader>
              <CardTitle>{i.name}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button
                onClick={() =>
                  navigate({
                    to: "/dashboard/$projectId",
                    params: {
                      projectId: i._id,
                    },
                    search: {
                      apiKey: "",
                    },
                  })
                }
              >
                View Project
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <CreateProjectDialog>
        <Button>Create Project</Button>
      </CreateProjectDialog>
    </div>
  );
}

function EmptyProjects() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          Create a project to start recieving notifications to your devices
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <CreateProjectDialog>
          <Button>Create Project</Button>
        </CreateProjectDialog>
      </EmptyContent>
    </Empty>
  );
}
