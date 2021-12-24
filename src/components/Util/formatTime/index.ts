const formatTimeSegment = (time: number) =>
  String(Math.floor(time)).padStart(2, '0');

export function formatTimeLiveAuction(ms: number) {
  const seconds = ms / 1000;

  if (ms <= 0) return '00:00:00';

  const s = formatTimeSegment(seconds % 60);
  const m = formatTimeSegment((seconds / 60) % 60);
  const h = formatTimeSegment((seconds / (60 * 60)) % 24);
  const d = formatTimeSegment(seconds / (60 * 60 * 24));

  return `${d === '00' ? '' : `${d}:`}${h}:${m}:${s}`;
}

export function formtTimeItemDetail(ms: number) {
  const seconds = ms / 1000;

  if (ms <= 0) return { Day: '0', Hours: '0', Minutes: '0', Seconds: '0' };

  const s = formatTimeSegment(seconds % 60);
  const m = formatTimeSegment((seconds / 60) % 60);
  const h = formatTimeSegment((seconds / (60 * 60)) % 24);
  const d = formatTimeSegment(seconds / (60 * 60 * 24));

  return { Day: d, Hours: h, Minutes: m, Seconds: s };
}
