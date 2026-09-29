export const SLOT_TIMES = ["08:00", "10:00", "12:00", "14:00", "16:00"] as const;

export type SlotTime = (typeof SLOT_TIMES)[number];

export function parseServiceDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return date;
}

export function toDateInputValue(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function startOfUtcDay(date: Date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

export function isBookableDate(value: string, now = new Date()) {
  const date = parseServiceDate(value);
  if (!date || date.getUTCDay() === 0) return false;
  const today = startOfUtcDay(now);
  const latest = new Date(today);
  latest.setUTCDate(latest.getUTCDate() + 21);
  return date >= today && date <= latest;
}

function hash(value: string) {
  let total = 0;
  for (const char of value) total = (total * 33 + char.charCodeAt(0)) >>> 0;
  return total;
}

export function openSlots(value: string, now = new Date()): SlotTime[] {
  if (!isBookableDate(value, now)) return [];
  const blocked = hash(value) % SLOT_TIMES.length;
  return SLOT_TIMES.filter((_, index) => index !== blocked);
}

export function isSlotOpen(value: string, time: string, now = new Date()) {
  return openSlots(value, now).includes(time as SlotTime);
}

export function formatSlotLabel(time: string) {
  const [hourText, minute] = time.split(":");
  const hour = Number(hourText);
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:${minute} ${suffix}`;
}
