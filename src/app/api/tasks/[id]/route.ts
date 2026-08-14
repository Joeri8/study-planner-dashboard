import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: RouteContext
) {
  try {
    await connectDB();

    const { id } = await params;

    const task = await Task.findById(id);

    if (!task) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Could not fetch task" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTask) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Could not update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Could not delete task" },
      { status: 500 }
    );
  }
}