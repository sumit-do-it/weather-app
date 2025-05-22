import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(localizedFormat);

export function formatDate(dateString: string) {
  const date = dayjs(dateString);

  if (date.isToday()) {
    return date.format("h:mm A"); // show time like 3:45 PM
  }

  if (date.isYesterday()) {
    return "Yesterday";
  }

  return date.format("MMM D, YYYY"); // e.g., May 20, 2025
}
