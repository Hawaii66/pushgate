import { useAuthActions } from '@convex-dev/auth/react'
import { createFileRoute } from '@tanstack/react-router'
import { Authenticated, AuthLoading, Unauthenticated, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useMutation } from '@tanstack/react-query'
import { useConvexMutation } from '@convex-dev/react-query'

export const Route = createFileRoute("/")({ component: Home })

function Home() {
	const {signIn,signOut} = useAuthActions()
	const test = useQuery(api.test.test)
	const test2 = useMutation({
		mutationFn:useConvexMutation(api.test.mut)
	})

  return (
    <div className="p-8">
      <h1 className="font-bold text-4xl">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
	  <pre>{JSON.stringify(test,null,2)}</pre>
	  <button onClick={()=>test2.mutate({})} >
		Test
	  </button>
	  <pre>{JSON.stringify({data:test2.data,status:test2.status,what:test2.error},null,2)}</pre>
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
