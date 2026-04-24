import PendingButton from "#/components/PendingButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "#/components/ui/alert-dialog";
import { Button } from "#/components/ui/button";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { useNewApiContext } from "./NewApiKeyWrapper";

type Props = {
  apiKey?: string;
  projectId: Id<"projects">;
};

export default function ApiKeyView({
  apiKey: apiKeyDefault,
  projectId,
}: Props) {
  const [apiKey, setApiKey] = useState(apiKeyDefault);
  const { setNewApiKey } = useNewApiContext();

  useEffect(() => {
    setNewApiKey(undefined);
  }, [apiKeyDefault]);

  const rotateApiKeyMutation = useMutation<
    { plainApiKey: string },
    unknown,
    { projectId: Id<"projects"> }
  >({
    mutationFn: useConvexMutation(api.project.rotateApiKey),
    onSuccess: ({ plainApiKey }) => {
      setApiKey(plainApiKey);
    },
  });

  return (
    <div className="flex flex-col items-start py-4">
      <p className="font-semibold text-primary text-2xl underline">API Key</p>
      {apiKey && (
        <>
          <div className="bg-yellow-400 p-4 rounded-2xl">{apiKey}</div>
          <p className="p-2 font-bold">
            Save the API key, this is the only time it will be visible
          </p>
        </>
      )}
      <AlertDialog>
        <AlertDialogTrigger>
          <PendingButton isPending={rotateApiKeyMutation.isPending}>
            <Button>Rotate API key</Button>
          </PendingButton>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rotate API key?</AlertDialogTitle>
            <AlertDialogDescription>
              The previous key will stop working right away
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => rotateApiKeyMutation.mutate({ projectId })}
            >
              Rotate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
