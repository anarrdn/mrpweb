export async function uploadImage(file: File): Promise<string> {
  try {
    // Create form data
    const formData = new FormData();
    formData.append("file", file);

    // Upload to your API endpoint
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.url; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export function isBase64Image(str: string): boolean {
  return str.startsWith("data:image");
}

export function getValidImageUrl(url: string | null): string | null {
  if (!url) return null;

  // If it's a base64 data URL, return it as is
  if (url.startsWith("data:image")) {
    return url;
  }

  // If it's a relative URL, add a leading slash
  if (!url.startsWith("/") && !url.startsWith("http")) {
    return `/${url}`;
  }

  return url;
}
