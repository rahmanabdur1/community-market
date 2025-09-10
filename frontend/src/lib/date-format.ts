import { DateTime } from "luxon";

export function formatDistanceStrict(
  toDate: string | Date,
  baseDate = new Date()
) {
  const date =
    typeof toDate === "string"
      ? DateTime.fromISO(toDate)
      : DateTime.fromJSDate(toDate);
  const base = DateTime.fromJSDate(baseDate);

  return date.toRelative({
    base,
    unit: ["years", "months", "days", "hours", "minutes"],
  });
}
