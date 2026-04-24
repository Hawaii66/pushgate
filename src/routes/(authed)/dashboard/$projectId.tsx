import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authed)/dashboard/$projectId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(authed)/dashboard/$projectId"!</div>
}
