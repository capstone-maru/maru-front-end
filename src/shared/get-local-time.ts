export function getLocalTime(isoString: string) {
  return new Date(isoString).toLocaleString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
  });
}
