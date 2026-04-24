export function GenerateProjectConnectionSecret() {
  return crypto.randomUUID();
}

export function GenerateProjectApiKey() {
  const key = crypto.randomUUID();
  return `pg_1_${key}`.replace(/-/g, "");
}

export async function HashProjectApiKey(plainKey: string) {
  const metadataArray = plainKey.split("_");
  const metadata = metadataArray.splice(0, metadataArray.length - 2).join("_");

  const encoder = new TextEncoder();
  const data = encoder.encode(plainKey);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${metadata}_${hash}`;
}
