import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });

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