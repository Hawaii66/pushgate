import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
  FilterNull,
  GetDevice,
  GetUserId,
  VerifyDeviceBelongsToUser,
  VerifyUserInProject,
} from "./utils";

export const get = query({
  args: {
    deviceId: v.id("devices"),
  },
  handler: async (ctx, args) => {
    const userId = await GetUserId(ctx);
    await VerifyDeviceBelongsToUser(userId, args.deviceId, ctx);

    const device = await GetDevice(args.deviceId, ctx);

    return {
      _id: device._id,
      name: device.name,
    };
  },
});

export const listByProject = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const userId = await GetUserId(ctx);
    await VerifyUserInProject(userId, args.projectId, ctx);

    const deviceIds = await ctx.db
      .query("projectDevices")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();

    const devices = await Promise.all(
      deviceIds.map((i) => GetDevice(i.deviceId, ctx)),
    );

    return devices.filter(FilterNull).map((i) => ({
      _id: i._id,
      name: i.name,
      userId: i.userId,
    }));
  },
});

export const addDeviceToProject = mutation({
  args: {
    deviceId: v.id("devices"),
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const userId = await GetUserId(ctx);
    await VerifyUserInProject(userId, args.projectId, ctx);

    await ctx.db.insert("projectDevices", {
      deviceId: args.deviceId,
      projectId: args.projectId,
    });
  },
});

export const addDeviceToUser = mutation({
  args: {
    name: v.string(),
    pushToken: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await GetUserId(ctx);

    const deviceId = await ctx.db.insert("devices", {
      name: args.name,
      userId: userId,
      pushToken: args.pushToken,
    });

    return deviceId;
  },
});

export const setPushTokenForDevice = mutation({
  args: {
    deviceId: v.id("devices"),
    pushToken: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await GetUserId(ctx);
    await VerifyDeviceBelongsToUser(userId, args.deviceId, ctx);

    await ctx.db.patch(args.deviceId, {
      pushToken: args.pushToken,
    });
  },
});
