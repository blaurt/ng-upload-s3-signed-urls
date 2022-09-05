// Create service client module using ES6 syntax.
import { S3Client } from "@aws-sdk/client-s3";
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ 
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_KEY!,
    }
});
export { s3Client };
