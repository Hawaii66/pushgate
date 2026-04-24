import { useAuthActions } from '@convex-dev/auth/react'
import { createFileRoute } from '@tanstack/react-router'
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react'

export const Route = createFileRoute("/")({ component: Home })

function Home() {
	const {signIn,signOut} = useAuthActions()

  return (
    <div className="p-8">
      <h1 className="font-bold text-4xl">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
	  <pre>{JSON.stringify(test,null,2)}</pre>
	  <AuthLoading>
		loading
	  </AuthLoading>
	<Unauthenticated>
	  <button onClick={()=>signIn("github")} >Signin</button>
	</Unauthenticated>
	<Authenticated>
		<p>suecccess</p>
		<button onClick={()=>signOut()} >Sign out</button>
	</Authenticated>
	</div>
  )
}
