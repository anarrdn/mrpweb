import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { config } from "@/lib/config";

// This would connect to your actual backend API
const API_URL = config.backendUrl;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Registration request body:', body);
    const {
      name,
      email,
      password,
      pharmacy_name,
      pharmacy_register_number,
      pharmacy_address,
      phone_number,
      payment_proof,
    } = body;

    // Call your actual backend API for registration
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pharmacy_name,
        pharmacy_register_number,
        pharmacy_address,
        phone_number,
        ...(payment_proof && { payment_proof }),
      }),
    });

    const backendText = await response.clone().text();
    console.log('Backend response:', backendText);

    if (!response.ok) {
      return NextResponse.json(
        { error: backendText || "Registration failed" },
        { status: response.status }
      );
    }

    const data = JSON.parse(backendText);

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
