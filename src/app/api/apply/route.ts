import { NextResponse } from "next/server";
import { uploadFile } from "@/utils/s3";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const jobId = Number(formData.get("jobId"));
    const userEmail = formData.get("email") as string;
    const resume = formData.get("resume") as File;
    const profileImage = formData.get("profileImage") as File;

    if (!jobId || !userEmail || !resume || !profileImage) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if the user has already applied
    const existingApplication = await prisma.application.findFirst({
      where: { jobId, email: userEmail as string },
    });
    if (existingApplication) {
      return NextResponse.json({ error: "You have already applied for this job" }, { status: 400 });
    }

    // Upload files to S3
    const resumeUrl = await uploadFile(resume);
    const imageUrl = await uploadFile(profileImage);

    // Save to DB
    await prisma.application.create({
      data: {
        jobId,
        email: userEmail,
        resume: resumeUrl,
        profileImage: imageUrl,
      },
    });

    return NextResponse.json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
