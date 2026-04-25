import { convexAuth } from "@convex-dev/auth/server";
import GitHub from "@auth/core/providers/github";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [GitHub],
  callbacks: {
    redirect: async ({ redirectTo }) => {
      console.log("Auth redirect to", redirectTo);
      return redirectTo;
    },
  },
});
