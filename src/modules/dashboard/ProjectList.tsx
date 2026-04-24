import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";

export default function ProjectList(){
	const projects = useQuery(api.project.list);

	return <div>
	</div>
}