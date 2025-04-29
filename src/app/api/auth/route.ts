import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// This would connect to your actual backend API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.88.93:8000";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Call your actual backend API (use /api/login instead of /login)
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Debug log backend response status
    console.log("Backend login response status:", response.status);

    const data = await response.json();
    // Debug log backend response body
    console.log("Backend login response body:", data);

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || "Login failed" },
        { status: response.status }
      );
    }

    // Debug log for token and user
    console.log("Token:", data.token);
    console.log("User:", data.user);

    // Set HTTP-only cookies for security
    const cookieStore = await cookies();
    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "strict",
    });

    // Store user data in a non-HTTP-only cookie for client access
    cookieStore.set("user", JSON.stringify(data.user), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "strict",
    });

    return NextResponse.json({ success: true, user: data.user });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
