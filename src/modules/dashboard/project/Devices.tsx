import { Empty, EmptyDescription, EmptyTitle } from "#/components/ui/empty";
import type { Id } from "convex/_generated/dataModel";

type Props = {
  devices:
    | {
        _id: Id<"devices">;
        name: string;
      }[]
    | undefined;
};

export default function UserDevices({ devices }: Props) {
  const isEmpty = devices === undefined || devices?.length === 0;

  return (
    <div>
      <p className="font-semibold text-primary text-lg underline">Devices</p>
      <div>
        {isEmpty ? (
          <Empty>
            <EmptyTitle>No Devices Connected</EmptyTitle>
            <EmptyDescription>
              Scan the QR code to connect a device
            </EmptyDescription>
          </Empty>
        ) : (
          devices.map((i) => <p>{i.name}</p>)
        )}
      </div>
    </div>
  );
}
