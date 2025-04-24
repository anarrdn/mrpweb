import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    return NextResponse.json({
      applinks: {
        apps: [],
        details: [
          {
            appIDs: ["SZBD4LZ6Q7.zahi.techpartners.asia"],
            paths: ["*"]
          }
        ]
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to search emails"
    });
  }
}
