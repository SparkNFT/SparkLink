// Timestamp in second.
export function getAuthorizationExpiration(): number {
  const currentTimestamp = Date.now();
  return Math.floor((currentTimestamp + 5 * 60 * 1000) / 1000);
}
