import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// This would connect to your actual backend API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      username,
      email,
      password,
      pharmacy_name,
      pharmacy_register_number,
      pharmacy_address,
      phone_number,
    } = body;

    // Call your actual backend API for registration
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        pharmacy_name,
        pharmacy_register_number,
        pharmacy_address,
        phone_number,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || "Registration failed" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // If registration auto-logs in the user, set secure cookies
    if (data.token) {
      const cookieStore = await cookies();
      cookieStore.set("token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
        sameSite: "strict",
      });

      cookieStore.set("user", JSON.stringify(data.user || data), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
        sameSite: "strict",
      });
    }

    return NextResponse.json({ success: true, user: data.user || data });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
