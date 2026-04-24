import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react'

export const Route = createFileRoute('/(authed)')({
  component: RouteComponent,
})

function RouteComponent() {
	return <>
		<AuthLoading>
			<p>Loading Auth</p>
		</AuthLoading>
		<Unauthenticated>
			<p>Sign in</p>
		</Unauthenticated>
		<Authenticated>
			<Outlet/>
		</Authenticated>
	</>
}
