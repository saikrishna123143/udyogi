import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Initialize S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Function to extract file key from full URL (if necessary)
function extractS3Key(urlOrKey: string): string | null {
  if (!urlOrKey) return null;

  // Check if it's a full URL and extract key
  return urlOrKey.startsWith("http") ? urlOrKey.split(".com/")[1] : urlOrKey;
}

// Function to generate signed URLs
async function getSignedS3Url(urlOrKey: string) {
  const s3Key = extractS3Key(urlOrKey);
  if (!s3Key) return null;

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: s3Key,
  });

  return await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1-hour expiry
}

export async function GET(req: NextRequest) {
  try {
    const applications = await prisma.application.findMany({
      select: {
        id: true,
        email: true,
        jobId: true,
        status: true,
        resume: true,
        profileImage: true,
        createdAt: true,
      },
    });

    if (applications.length === 0) {
      return NextResponse.json({ message: "No applications found" }, { status: 404 });
    }

    // Generate signed URLs
    const applicationsWithSignedUrls = await Promise.all(
      applications.map(async (app) => ({
        ...app,
        resume: app.resume ? await getSignedS3Url(app.resume) : null,
        profileImage: app.profileImage ? await getSignedS3Url(app.profileImage) : null,
      }))
    );

    return NextResponse.json({ applications: applicationsWithSignedUrls }, { status: 200 });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
