import { useQuery } from "convex/react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GetDeviceId } from "@/lib/device";

export default function Home() {
  const device = useQuery(api.devices.get, {
    deviceId: GetDeviceId(),
  });

  return (
    <SafeAreaView>
      <Text>What Home</Text>
    </SafeAreaView>
  );
}
