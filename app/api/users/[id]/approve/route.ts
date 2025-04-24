import { NextResponse } from "next/server";
import { config } from "@/lib/config";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `${config.backendUrl}/api/admin/users/${params.id}/approve`,
      {
        method: "POST",
        headers: {
          Authorization: request.headers.get("Authorization") || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to approve user");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error approving user:", error);
    return NextResponse.json(
      { error: "Хэрэглэгчийг баталгаажуулахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}
