import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  try {
    const { email, newStatus } = await req.json();

    // Validate input
    if (!email || !newStatus) {
      return NextResponse.json({ error: "Missing email or newStatus" }, { status: 400 });
    }

    // Find the application
    const application = await prisma.application.findFirst({
      where: { email },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found for the given email" }, { status: 404 });
    }

    // Update application status
    const updatedApplication = await prisma.application.updateMany({
      where: { email },
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
