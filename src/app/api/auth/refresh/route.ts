import { NextResponse } from "next/server";
import { apiConfig } from "@/lib/api/config";

export async function POST(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const response = await fetch(`${apiConfig.backendUrl}/auth/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to refresh token" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Validate response data
    if (!data.token) {
      return NextResponse.json(
        { error: "Invalid response from refresh endpoint" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error refreshing token:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to refresh token",
      },
      { status: 500 }
    );
  }
}
