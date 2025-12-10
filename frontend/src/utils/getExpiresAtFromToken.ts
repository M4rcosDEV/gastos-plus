export function getExpiresAtFromToken(token: string): string {
  const payloadBase64 = token.split(".")[1]; 
  const payloadDecoded = atob(payloadBase64);
  const payload = JSON.parse(payloadDecoded);

  const expiresAt = new Date(payload.exp * 1000).toISOString();

  return expiresAt;
}