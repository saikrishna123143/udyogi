import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma"; // Adjust the path based on your project structure

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Fetch application based on email
    const application = await prisma.application.findFirst({
      where: { email },
      select: { status: true },
    });

    if (!application) {
      return NextResponse.json(
        { error: "No application found for this email" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: application.status });
  } catch (error) {
    console.error("Error fetching application status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
