import { NextResponse } from "next/server";
import { config } from "@/lib/config";
import { apiClient } from "@/lib/api/client";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Validate token before making the request
    const isValid = await apiClient.validateToken();
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const response = await fetch(`${config.backendUrl}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch profile" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Validate response data
    if (!data.id || !data.email) {
      return NextResponse.json(
        { error: "Invalid profile data received" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch profile",
      },
      { status: 500 }
    );
  }
}
