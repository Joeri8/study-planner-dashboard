import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { cookies } from "next/headers";

//hämtar alla tasks den inloggade användaren
export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        { message: "Not logged in" },
        { status: 401 }
      );
    }

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Could not fetch tasks" },
      { status: 500 }
    );
  }
}

//postar till användarens task collection i databasen
export async function POST(request: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        { message: "Not logged in" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const task = await Task.create({
      title: body.title,
      description: body.description,
      subject: body.subject,
      priority: body.priority,
      status: body.status,
      dueDate: body.dueDate,
      userId: userId,
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