import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
  GenerateProjectApiKey,
  GenerateProjectConnectionSecret,
  HashProjectApiKey,
} from "./secret";
import {
  FilterNull,
  GetProject,
  VerifyUserInProject,
  GetUserId,
} from "./utils";

export const get = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const userId = await GetUserId(ctx);
    await VerifyUserInProject(userId, args.projectId, ctx);

    const project = await GetProject(args.projectId, ctx);

    return {
      _id: project._id,
      name: project.name,
      owner: project.owner,
      connectionSecret: project.connectionSecret,
    };
  },
});

export const getMembers = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const userId = await GetUserId(ctx);
    await VerifyUserInProject(userId, args.projectId, ctx);

    const memberIds = await ctx.db
      .query("usersInProject")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();

    const members = await Promise.all(
      memberIds.map((i) => ctx.db.get(i.userId)),
    );

    return members.filter(FilterNull).map((i) => ({
      _id: i._id,
      email: i.email,
      name: i.name,
      icon: i.image,
    }));
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await GetUserId(ctx);

    const projectsWithUserId = await ctx.db
      .query("usersInProject")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const projects = await Promise.all(
      projectsWithUserId.map((i) => ctx.db.get(i.projectId)),
    );

    return projects.filter(FilterNull).map((i) => ({
      _id: i._id,
      name: i.name,
    }));
  },
});

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await GetUserId(ctx);

    const projectExists = await ctx.db
      .query("projects")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .first();

    if (projectExists) {
      throw new Error("Project with that name already exists");
    }

    const connectionSecret = GenerateProjectConnectionSecret();
    const plainApiKey = GenerateProjectApiKey();
    const hashedKey = await HashProjectApiKey(plainApiKey);
    const newProjectId = await ctx.db.insert("projects", {
      name: args.name,
      owner: userId,
      apiKeyHash: hashedKey,
      connectionSecret: connectionSecret,
    });

    return {
      plainApiKey,
      projectId: newProjectId,
    };
  },
});
