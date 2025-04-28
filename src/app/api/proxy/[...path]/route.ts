import { NextRequest, NextResponse } from "next/server";
import { apiConfig } from "@/lib/api/config";

// Helper function to extract headers
function getHeaders(req: NextRequest): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Forward the Authorization header if present
  const authHeader = req.headers.get("Authorization");
  if (authHeader) {
    headers["Authorization"] = authHeader;
    console.log("Forwarding Authorization header");
  }

  return headers;
}

// Helper to handle response and set cookies if needed
async function handleApiResponse(response: Response) {
  let data;
  try {
    // Try to parse JSON, but don't fail if we can't
    const text = await response.text();
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      // If we can't parse JSON, use the text as is
      data = { error: text || "No response data", statusCode: response.status };
    }
  } catch (error) {
    console.error("Error reading response:", error);
    data = { error: "Failed to read response" };
  }

  // Pass through the status code from the backend
  return NextResponse.json(data, {
    status: response.status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join("/");
    console.log(`Proxying GET request to ${apiConfig.backendUrl}/api/${path}`);

    const headers = getHeaders(req);

    console.log("Request headers:", headers);

    const response = await fetch(`${apiConfig.backendUrl}/api/${path}`, {
      headers,
    });

    console.log(`Backend response: ${response.status} ${response.statusText}`);

    return handleApiResponse(response);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy request", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join("/");
    const url = `${apiConfig.backendUrl}/api/${path}`;
    console.log(`Proxying POST request to ${url}`);

    const body = await req.json();
    console.log("Request body:", JSON.stringify(body));

    const headers = getHeaders(req);
    console.log("Request headers:", headers);

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    console.log(`Backend response: ${response.status} ${response.statusText}`);

    return handleApiResponse(response);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy request", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join("/");
    console.log(`Proxying PUT request to ${apiConfig.backendUrl}/api/${path}`);

    const body = await req.json();
    const headers = getHeaders(req);

    const response = await fetch(`${apiConfig.backendUrl}/api/${path}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    return handleApiResponse(response);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy request", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join("/");
    console.log(`Proxying DELETE request to ${apiConfig.backendUrl}/api/${path}`);

    const headers = getHeaders(req);

    const response = await fetch(`${apiConfig.backendUrl}/api/${path}`, {
      method: "DELETE",
      headers,
    });

    return handleApiResponse(response);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy request", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
