import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../../convex/_generated/api";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const result = useSuspenseQuery(convexQuery(api.test.test));

  return (
    <div className="p-8">
      <h1 className="font-bold text-4xl">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
      <pre>{JSON.stringify(result.data)}</pre>
    </div>
  );
}
