import type { DayOfWeek, OperationalHour } from "@prisma/client";

/**
 * Mapping of weekdays from numbers to DayOfWeek enum strings.
 */
export const dayOfWeekMapping: Record<number, DayOfWeek> = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY",
};

/**
 * Gets the day of the week for today in DayOfWeek format.
 * This is used to compare with operational hours data.
 */
export const todayDayOfWeek: DayOfWeek | undefined =
  dayOfWeekMapping[new Date().getDay()];

/**
 * Formats a Date object into a string in "HH:MM" format.
 * @param date - The Date object to be formatted
 * @returns A string representing the time in "HH:MM" format
 */
function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Gets the operational start time for today.
 * @param operationalHours - Array of operational hours
 * @returns Start time in "HH:MM" format or "-" if not available
 */
export function getOperationalStartTime(
  operationalHours: OperationalHour[],
): string {
  const todayHours = operationalHours.find(
    (hour) => hour.dayOfWeek === todayDayOfWeek,
  );
  return todayHours?.startTime ? formatTime(todayHours.startTime) : "-";
}

/**
 * Gets the operational end time for today.
 * @param operationalHours - Array of operational hours
 * @returns End time in "HH:MM" format or "-" if not available
 */
export function getOperationalEndTime(
  operationalHours: OperationalHour[],
): string {
  const todayHours = operationalHours.find(
    (hour) => hour.dayOfWeek === todayDayOfWeek,
  );
  return todayHours?.endTime ? formatTime(todayHours.endTime) : "-";
}
