import { NextResponse } from "next/server";
import { config } from "@/lib/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${config.backendUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to login" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Validate response data
    if (!data.token || !data.user) {
      return NextResponse.json(
        { error: "Invalid response from authentication server" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to login",
      },
      { status: 500 }
    );
  }
}
