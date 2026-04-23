export function getHttpErrorStatus(err: unknown): number | undefined {
  if (typeof err !== "object" || err === null || !("response" in err)) {
    return undefined;
  }
  const res = (
    err as {
      response?: { status?: number; data?: { statusCode?: number } };
    }
  ).response;
  if (!res) return undefined;
  return res.data?.statusCode ?? res.status;
}

export function getApiErrorMessage(err: unknown): string | undefined {
  if (typeof err !== "object" || err === null || !("response" in err)) {
    return undefined;
  }
  const data = (
    err as { response?: { data?: { message?: string | string[] } } }
  ).response?.data;
  if (!data?.message) return undefined;
  return Array.isArray(data.message) ? data.message.join(", ") : data.message;
}
