import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  projects: defineTable({
    name: v.string(),
    owner: v.id("users"),
    connectionSecret: v.string(),
    apiKeyHash: v.string(),
  }).index("by_name", ["name"]),
  usersInProject: defineTable({
    projectId: v.id("projects"),
    userId: v.id("users"),
  })
    .index("by_project", ["projectId"])
    .index("by_user", ["userId"])
    .index("by_project_user", ["projectId", "userId"]),
  devices: defineTable({
    userId: v.id("users"),
    name: v.string(),
    pushToken: v.optional(v.string()),
  }).index("by_user", ["userId"]),
  projectDevices: defineTable({
    projectId: v.id("projects"),
    deviceId: v.id("devices"),
  }).index("by_project", ["projectId"]),
  notifications: defineTable({
    projectId: v.id("project"),
    title: v.string(),
    body: v.string(),
    sentAt: v.string(),
    status: v.string(),
  }).index("by_project", ["projectId"]),
});
