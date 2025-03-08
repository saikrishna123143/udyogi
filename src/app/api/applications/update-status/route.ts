import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  try {
    const { email, jobId, newStatus } = await req.json();

    // Validate input
    if (!email || !jobId || !newStatus) {
      return NextResponse.json({ error: "Missing email, jobId, or newStatus" }, { status: 400 });
    }

    // Find the application
    const application = await prisma.application.findUnique({
      where: {
        jobId_email: {
          jobId: parseInt(jobId),
          email,
        },
      },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found for the given email and job ID" }, { status: 404 });
    }

    // Update application status
    const updatedApplication = await prisma.application.update({
      where: {
        jobId_email: {
          jobId: parseInt(jobId),
          email,
        },
      },
      data: { status: newStatus },
    });

    return NextResponse.json(
      { message: "Application status updated successfully", updatedApplication },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
