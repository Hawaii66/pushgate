import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "#/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState, type PropsWithChildren } from "react";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "convex/_generated/api";
import PendingButton from "#/components/PendingButton";
import type { Id } from "convex/_generated/dataModel";
import { useNavigate } from "@tanstack/react-router";
import { useNewApiContext } from "./project/NewApiKeyWrapper";

export default function CreateProjectDialog({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const { setNewApiKey } = useNewApiContext();

  const navigate = useNavigate();
  const createProjectMutation = useMutation<
    {
      plainApiKey: string;
      projectId: Id<"projects">;
    },
    never,
    { name: string }
  >({
    mutationFn: useConvexMutation(api.project.create),
    onSuccess: ({ plainApiKey, projectId }) => {
      setIsOpen(false);
      setNewApiKey(plainApiKey);
      navigate({
        to: "/dashboard/$projectId",
        params: {
          projectId,
        },
      });
    },
    onError: (e) => alert(e),
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Create Project</DialogTitle>
        <DialogDescription>
          Create a new project to send notifications and connect devices to.
        </DialogDescription>
        <FieldGroup>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <FieldDescription>The name of the project</FieldDescription>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <PendingButton isPending={createProjectMutation.isPending}>
            <Button
              onClick={() =>
                createProjectMutation.mutate({
                  name,
                })
              }
            >
              Create
            </Button>
          </PendingButton>
          <DialogClose />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
