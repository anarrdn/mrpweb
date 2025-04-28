import { NextResponse } from "next/server";
import { apiConfig } from "@/lib/api/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, token } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const response = await fetch(`${apiConfig.backendUrl}/admin/users/premium`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add premium user");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to add premium user",
      },
      { status: 500 }
    );
  }
}
