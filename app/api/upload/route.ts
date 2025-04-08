import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@/auth";

const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function POST(req: NextRequest) {
    try {
        // 1. Auth Check
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { filename, contentType } = await req.json();

        // 2. Validate Input
        if (!filename || !contentType) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 3. Generate Unique Key
        // Simple sanitization: remove spaces, add timestamp
        const cleanFilename = filename.replace(/\s+/g, "-");
        const uniqueKey = `products/${Date.now()}-${cleanFilename}`;

        // 4. Generate Presigned URL
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: uniqueKey,
            ContentType: contentType,
            // ACL: 'public-read', // Optional: depends on bucket settings. typically better to use Bucket Policy.
        });

        const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 }); // 5 minutes

        // 5. Return URLs
        // Construct public URL (assuming standard S3 public access or CloudFront)
        // If using CloudFront, replace this domain.
        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`;

        return NextResponse.json({ uploadUrl, fileUrl });

    } catch (error) {
        console.error("S3 Presign Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
