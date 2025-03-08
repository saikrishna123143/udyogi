import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust the path based on your project structure

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const jobId = searchParams.get("jobId");

    if (!email || !jobId) {
      return NextResponse.json({ error: "Email and Job ID are required" }, { status: 400 });
    }

    // Fetch application based on email and job ID
    const application = await prisma.application.findUnique({
      where: { 
        jobId_email: { 
          jobId: parseInt(jobId), 
          email 
        }
      },
      select: { status: true, resume: true, profileImage: true, createdAt: true },
    });

    if (!application) {
      return NextResponse.json(
        { error: "No application found for this email and Job ID" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      status: application.status, 
      resume: application.resume, 
      profileImage: application.profileImage, 
      createdAt: application.createdAt 
    });
  } catch (error) {
    console.error("Error fetching application status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
