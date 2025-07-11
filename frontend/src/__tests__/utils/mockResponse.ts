export function createMockResponse(data?: any, status: number = 200): Response {
  const body = data === undefined ? null : JSON.stringify(data);
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

