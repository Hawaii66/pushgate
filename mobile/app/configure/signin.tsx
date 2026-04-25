import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { makeRedirectUri } from "expo-auth-session";
import { Redirect } from "expo-router";
import { openAuthSessionAsync } from "expo-web-browser";
import { Alert, Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const redirectToUrl = makeRedirectUri();

export default function Page() {
  const { signIn } = useAuthActions();

  const handleSignIn = async () => {
    const { redirect } = await signIn("github", { redirectTo: redirectToUrl });

    const result = await openAuthSessionAsync(
      redirect!.toString(),
      redirectToUrl,
    );
    if (result.type === "success") {
      const { url } = result;
      const code = new URL(url).searchParams.get("code")!;
      await signIn("github", { code });
    } else {
      Alert.alert("error sign in", result.type);
    }
  };

  return (
    <View>
      <AuthLoading>
        <Text>Loading</Text>
      </AuthLoading>
      <Unauthenticated>
        <SafeAreaView>
          <Button onPress={handleSignIn} title="Sign in" />
        </SafeAreaView>
      </Unauthenticated>
      <Authenticated>
        <Redirect href={"/(authed)/home"} />
      </Authenticated>
    </View>
  );
}
