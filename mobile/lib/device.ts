import AsyncStorage from "@react-native-async-storage/async-storage";
import { Id } from "../../convex/_generated/dataModel";

const DEVICE_ID_KEY = "device_id";

let deviceId: Id<"devices"> | null = null;
let isNew = false;

export async function ConfigureDeviceId() {
  const previousDeviceId = await AsyncStorage.getItem(DEVICE_ID_KEY);

  if (previousDeviceId) {
    deviceId = previousDeviceId as Id<"devices">;
    isNew = false;
  } else {
    isNew = true;
  }
}

export async function ConfigureNewPhone(newDeviceId: Id<"devices">) {
  await AsyncStorage.setItem(DEVICE_ID_KEY, newDeviceId);
  isNew = false;
  deviceId = newDeviceId;
}

export function GetDeviceId() {
  if (!deviceId) {
    throw new Error("Device id not configured");
  }

  return deviceId;
}
export function GetIsNew() {
  return isNew;
}
