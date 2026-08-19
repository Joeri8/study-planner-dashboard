import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password } = body;

    const user = await User.findOne({
      email,
      password,
    });

    //om email redan finns visa ett felmeddelande
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    //om email finns, skapa en cookie och skicka tillbaka ett svar
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    //sätter en cookie och gör den tillänglig för hela webbplatsen
    response.cookies.set("loggedIn", "true", {
      httpOnly: true,
      path: "/",
    });

    //cookie med säkerhetsinställning för Userid
    response.cookies.set("userId", user._id.toString(), {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Login failed",
      },
      {
        status: 500,
      }
    );
  }
}