import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Redirect, Stack, Tabs } from "expo-router";
import { Text } from "react-native";

export default function Layout() {
  return (
    <>
      <AuthLoading>
        <Text>Loading Auth</Text>
      </AuthLoading>
      <Authenticated>
        <Tabs screenOptions={{ headerShown: false }}></Tabs>
      </Authenticated>
      <Unauthenticated>
        <Redirect href={"/configure/signin"} />
      </Unauthenticated>
    </>
  );
}
