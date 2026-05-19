import type { ApiHealthResponse } from '@monolith/types';

const apiUrl =
  process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export async function getApiHealth(): Promise<ApiHealthResponse | null> {
  try {
    const response = await fetch(`${apiUrl}/api/health`, {
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as ApiHealthResponse;
  } catch {
    return null;
  }
}
