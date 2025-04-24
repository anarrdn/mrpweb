import { NextResponse } from "next/server";
import { config } from "@/lib/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, pharmacyId, pharmacyAddress } = body;

    // Validate required fields
    if (!email || !password || !name || !pharmacyId || !pharmacyAddress) {
      return NextResponse.json(
        { error: "Бүх талбарыг бөглөнө үү" },
        { status: 400 }
      );
    }

    console.log("Sending request to backend:", {
      url: `${config.backendUrl}/api/auth/register`,
      body: { email, name, pharmacyId, pharmacyAddress },
    });

    let response;
    try {
      response = await fetch(`${config.backendUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          pharmacyId,
          pharmacyAddress,
          role: "pending",
          status: "pending",
        }),
      });
    } catch (fetchError) {
      console.error("Error connecting to backend:", fetchError);
      return NextResponse.json(
        {
          error: "Серверт холбогдох боломжгүй байна. Дараа дахин оролдоно уу.",
        },
        { status: 503 }
      );
    }

    console.log("Backend response status:", response.status);
    const responseText = await response.text();
    console.log("Backend response text:", responseText);

    let data;
    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch (e) {
      console.error("Error parsing response:", e);
      console.error("Response text that failed to parse:", responseText);
      return NextResponse.json(
        { error: "Серверийн хариу буруу форматтай байна" },
        { status: 500 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Бүртгэл үүсгэхэд алдаа гарлаа" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in registration route:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Бүртгэл үүсгэхэд алдаа гарлаа",
      },
      { status: 500 }
    );
  }
}
