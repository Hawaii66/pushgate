import {query,mutation} from "./_generated/server"

export const test = query({
	args:{},
	handler:()=>{
		return "test"
	}
})

export const mut = mutation({
	args:{},
	handler:()=>{
		return "wat"
	}
})