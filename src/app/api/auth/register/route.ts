import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/hash";

const REGISTER_TOKEN = process.env.ADMIN_REGISTRATION_TOKEN;

export async function POST(req: Request) {
  try {
    const requestToken = req.headers.get("x-registration-token");
    if (!REGISTER_TOKEN || requestToken !== REGISTER_TOKEN) {
      return NextResponse.json({ error: "Registration is disabled" }, { status: 403 });
    }

    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email & password are required" },
        { status: 400 },
      );
    }
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }
    const hashedPassword = await hashPassword(password);

    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return NextResponse.json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while registering the user",
      },
      { status: 500 },
    );
  }
}
