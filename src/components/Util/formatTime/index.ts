const formatTimeSegment = (time: number) =>
  String(Math.floor(time)).padStart(2, '0');

export default function formatTime(ms: number) {
  const seconds = ms / 1000;

  if (ms <= 0) return '00:00:00';

  const s = formatTimeSegment(seconds % 60);
  const m = formatTimeSegment((seconds / 60) % 60);
  const h = formatTimeSegment((seconds / (60 * 60)) % 24);
  const d = formatTimeSegment(seconds / (60 * 60 * 24));

  return `${d === '00' ? '' : `${d}:`}${h}:${m}:${s}`;
}
