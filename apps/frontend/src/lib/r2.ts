import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { serverEnv } from "./env.server";

let cached: { client: S3Client; bucket: string } | null = null;

function getClient() {
  if (cached) return cached;
  const r2 = serverEnv.r2();
  cached = {
    client: new S3Client({
      region: "auto",
      endpoint: `https://${r2.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: r2.accessKeyId,
        secretAccessKey: r2.secretAccessKey,
      },
    }),
    bucket: r2.bucketName,
  };
  return cached;
}

export async function getDownloadUrl(
  key: string,
  expiresIn = 3600
): Promise<string> {
  const { client, bucket } = getClient();
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn });
}
