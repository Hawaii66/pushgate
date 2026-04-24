import { Avatar, AvatarImage } from "#/components/ui/avatar";
import { Separator } from "#/components/ui/separator";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useMemo } from "react";
import UserDevices from "./Devices";

type Props = {
  projectId: Id<"projects">;
};

export default function ProjectMembers({ projectId }: Props) {
  const projectMembers = useQuery(api.project.getMembers, {
    projectId,
  });
  const devices = useQuery(api.devices.listByProject, {
    projectId,
  });

  const devicesByUser = useMemo(() => {
    if (!projectMembers || !devices) {
      return null;
    }

    return new Map(
      projectMembers.map((i) => [
        i._id,
        devices.filter((j) => j.userId === i._id),
      ]),
    );
  }, [projectMembers, devices]);

  return (
    <div className="flex flex-col items-start py-4">
      <p className="font-semibold text-primary text-2xl underline">Members</p>
      <div className="flex flex-col justify-start items-start gap-2 pl-4">
        {projectMembers?.map((i, idx) => {
          const devices = devicesByUser?.get(i._id);
          return (
            <>
              <div>
                <div className="flex flex-row justify-start items-center gap-2 py-4">
                  <Avatar>
                    <AvatarImage src={i.icon} />
                  </Avatar>
                  <div>
                    <p>{i.name}</p>
                    <p>{i.email}</p>
                  </div>
                </div>
                <UserDevices devices={devices} />
              </div>
              {idx !== projectMembers.length - 1 && <Separator />}
            </>
          );
        })}
      </div>
    </div>
  );
}
