import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { QRCode } from "react-qr-code";
import ProjectMembers from "./Members";
import { Label } from "#/components/ui/label";
import ApiKeyView from "./ApiKey";

type Props = {
  projectId: Id<"projects">;
  apiKey?: string;
};

export default function Project({ projectId, apiKey }: Props) {
  const project = useQuery(api.project.get, {
    projectId,
  });

  if (!project) {
    return <p>Loading Project</p>;
  }

  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen">
      <Card className="min-w-1/2">
        <CardHeader>
          <CardTitle className="font-bold text-primary text-3xl">
            {project.name}
          </CardTitle>
          <CardDescription>
            This is the project dashboard. Add devices by scanning the qr code
            and view connected users and devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <QRCode
              value={`https://pushgate.dev/connect/${project.connectionSecret}`}
            />
            <Label className="pt-2 pl-2">- Scan to add device</Label>
          </div>
          <ApiKeyView projectId={projectId} apiKey={apiKey} />
          <ProjectMembers projectId={projectId} />
        </CardContent>
      </Card>
    </div>
  );
}
