const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000';
const API_KEY = process.env.NEXT_PUBLIC_DEMO_API_KEY || 'pilotspan_demo_local_dev_key';

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { idempotencyKey?: string } = {}
): Promise<T> {
  const { idempotencyKey, headers, ...rest } = init;
  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
      ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
      ...(headers || {}),
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${path}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export type Envelope<T> = { data: T; meta?: { correlationId?: string; generatedAt?: string } };
export type ListEnvelope<T> = Envelope<{ items: T[]; nextCursor?: string }>;
