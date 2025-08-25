export function FormatDate(dateInput: Date | string | number): string {
  const date = new Date(dateInput);
  const today = new Date();

  const isSameDay =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isSameDay) {
    return "today";
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };

  return date.toLocaleDateString("en-us", options);
}
