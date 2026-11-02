import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// Hamta den inloggade anvandarens namn och e-post.
export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json({ message: "Not logged in" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(userId).select("name email avatar");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      avatar: user.avatar || "",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Could not load profile" },
      { status: 500 }
    );
  }
}

// Spara namn och e-post for den inloggade anvandaren.
export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json({ message: "Not logged in" }, { status: 401 });
    }

    const { name, email, avatar } = await request.json();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { message: "Enter a name and a valid email address" },
        { status: 400 }
      );
    }

    // En liten bild sparas som text tillsammans med profilen.
    if (
      typeof avatar !== "string" ||
      avatar.length > 1400000 ||
      (avatar !== "" && !/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(avatar))
    ) {
      return NextResponse.json(
        { message: "Choose a JPG, PNG or WebP image, maximum 1 MB" },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existingUser = await User.findOne({
      email: email.trim(),
      _id: { $ne: userId },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already in use" },
        { status: 409 }
      );
    }

    user.name = name.trim();
    user.email = email.trim();
    user.avatar = avatar;
    await user.save();

    return NextResponse.json({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      message: "Profile saved!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Could not save profile" },
      { status: 500 }
    );
  }
}
