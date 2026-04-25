import ConvexWrapper from "@/integrations/convex";
import { ConfigureDeviceId, GetIsNew } from "@/lib/device";
import { router, Stack } from "expo-router";
import { PropsWithChildren, useEffect, useState } from "react";

export default function RootLayout() {
  return (
    <ConvexWrapper>
      <ConfigureDeviceIdWrapper>
        <Stack screenOptions={{ headerShown: false }} />
      </ConfigureDeviceIdWrapper>
    </ConvexWrapper>
  );
}

function ConfigureDeviceIdWrapper({ children }: PropsWithChildren) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const run = async () => {
      await ConfigureDeviceId();
      setIsLoaded(true);

      if (GetIsNew()) {
        router.replace("/configure/intro");
      }
    };
    run();
  }, []);

  if (!isLoaded) {
    return null;
  }

  return children;
}
