import type { PropsWithChildren } from "react"
import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"

type Props = {
	isPending:boolean
}

export default function PendingButton({isPending,children}:PropsWithChildren<Props>){
	if(isPending){
		return <Button>
			<Spinner />
		</Button>
	}
	
	return children
}