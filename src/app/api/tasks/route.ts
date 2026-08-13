import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";

export async function GET() {
  try {
    await connectDB();

    const tasks = await Task.find().sort({ createdAt: -1 });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Could not fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const task = await Task.create({
      title: body.title,
      description: body.description,
      subject: body.subject,
      priority: body.priority,
      status: body.status,
      dueDate: body.dueDate,
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Could not create task" },
      { status: 500 }
    );
  }
}