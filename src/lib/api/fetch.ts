type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
  cache?: RequestCache;
  revalidate?: number;
};

export async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const baseURL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  const url = `${baseURL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: options.cache,
    next: options.revalidate ? { revalidate: options.revalidate } : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.message || "An error occurred while fetching the data"
    );
  }

  return response.json();
}

// Example usage:
// const data = await fetchAPI<User>('/users', { method: 'GET' });
// const result = await fetchAPI<Response>('/users', {
//   method: 'POST',
//   body: { name: 'John' }
// });
