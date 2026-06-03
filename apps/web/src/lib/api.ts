import type {
  ApiHealthResponse,
  BookingRequestPayload,
  BookingRequestResponse,
} from '@monolith/types';

const serverApiUrl =
  process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export function getClientApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
}

export async function getApiHealth(): Promise<ApiHealthResponse | null> {
  try {
    const response = await fetch(`${serverApiUrl}/api/health`, {
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

export async function submitBookingRequest(
  payload: BookingRequestPayload,
): Promise<BookingRequestResponse | null> {
  try {
    const response = await fetch(`${getClientApiUrl()}/api/booking-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as BookingRequestResponse;
  } catch {
    return null;
  }
}
