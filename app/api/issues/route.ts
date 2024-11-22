import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "@/app/validationSchema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

    const newIssue = await prisma.issue.create({
      data: {
        title: body.title || "Default Title",
        description: body.description || "Default Description",
      },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.error("Error creating issue:", error); // Log any error
    return NextResponse.json({ error: "Failed to create issue" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const issues = await prisma.issue.findMany();
    return NextResponse.json(issues, { status: 200 });
  } catch (error) {
    console.error("Error fetching issues:", error);
    return NextResponse.json({ error: "Failed to fetch issues" }, { status: 500 });
  }
}
