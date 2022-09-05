import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./client"; // Helper function that creates an Amazon S3 service client module.
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


export async function createPutUrl(filenameToUpload: string): Promise<string> {
  // Create a command to put the object in the S3 bucket.
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filenameToUpload,
  });
  console.log("🚀 ~ file: index.ts ~ line 36 ~ run ~ command", command);
  // Create the presigned URL.
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });
  console.log(
    "🚀 ~ file: getSignedUrl.ts ~ line 25 ~ createPutUrl ~ signedUrl",
    signedUrl
  );

  return signedUrl;
}

export async function getDownloadUrl(
  filenameToUpload: string
): Promise<string> {
  // Create a command to put the object in the S3 bucket.
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filenameToUpload,
  });
  console.log(
    "🚀 ~ file: index.ts ~ line 36 ~ run ~ GetObjectCommand",
    command
  );
  // Create the presigned URL.
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });
  console.log(
    "🚀 ~ file: getSignedUrl.ts ~ line 25 ~ getDownloadUrl ~ signedUrl",
    signedUrl
  );

  return signedUrl;
}
