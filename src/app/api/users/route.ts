import { NextResponse } from "next/server";
import { apiConfig } from "@/lib/api/config";

export async function GET(request: Request) {
  try {
    const response = await fetch(`${apiConfig.backendUrl}/api/admin/users`, {
      headers: {
        Authorization: request.headers.get("Authorization") || "",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Алдаа гарлаа. Дахин оролдоно уу." },
      { status: 500 }
    );
  }
}
