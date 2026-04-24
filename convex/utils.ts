import { getAuthUserId } from "@convex-dev/auth/server";
import { QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export function FilterNull<T>(t: T | null): t is T {
  return t !== null;
}

export async function GetUserId(ctx: QueryCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw new Error("User not signed in");
  }

  return userId;
}

export async function GetDevice(deviceId: Id<"devices">, ctx: QueryCtx) {
  const device = await ctx.db.get(deviceId);
  if (!device) {
    throw new Error("Device not found");
  }

  return device;
}

export async function VerifyUserInProject(
  userId: Id<"users">,
  projectId: Id<"projects">,
  ctx: QueryCtx,
) {
  const userInProject = await ctx.db
    .query("usersInProject")
    .withIndex("by_project_user", (q) =>
      q.eq("projectId", projectId).eq("userId", userId),
    )
    .first();

  if (!userInProject) {
    throw new Error("User not in project");
  }
}

export async function VerifyDeviceBelongsToUser(
  userId: Id<"users">,
  deviceId: Id<"devices">,
  ctx: QueryCtx,
) {
  const devicesBelongingToUser = await ctx.db
    .query("devices")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .collect();

  if (devicesBelongingToUser.map((i) => i._id).includes(deviceId)) {
    return true;
  }

  return false;
}

export async function GetProject(projectId: Id<"projects">, ctx: QueryCtx) {
  const project = await ctx.db.get(projectId);
  if (!project) {
    throw new Error("Project not found");
  }

  return project;
}
