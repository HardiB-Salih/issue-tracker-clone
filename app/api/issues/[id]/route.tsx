import { createIssueSchema } from "@/lib/validationSchema";
import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    const intId = parseInt(params.id);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
      where: { id: intId },
    });

    if (!issue) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: intId },
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(updatedIssue);
  } catch (error) {
    console.log("[ISSUE_EDIT]");
    return NextResponse.json({ error: "Internal issue" }, { status: 500 });
  }
}
