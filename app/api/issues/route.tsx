import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../../lib/validationSchema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.log("[ISSUE]");
    return NextResponse.json({ error: "Internal issue" }, { status: 500 });
  }
}
