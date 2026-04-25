import { useAuthActions } from "@convex-dev/auth/react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { signOut } = useAuthActions();

  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <Button title="Sign Out" onPress={signOut} />
    </SafeAreaView>
  );
}
