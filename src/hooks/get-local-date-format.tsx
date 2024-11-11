/**
 * Retrieves the initials from a name, with a maximum of two letters.
 * @param date - Date to be formatted
 * @returns The initials of the name (maximum of two letters)
 */

// Helper function to format date
const formatLocalDate = ({
  date,
  dayFormat,
  monthFormat,
  yearFormat,
}: {
  date: Date | null;
  dayFormat?: "2-digit" | "numeric";
  monthFormat?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  yearFormat?: "numeric" | "2-digit";
}) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("id-ID", {
    day: dayFormat ?? "2-digit",
    month: monthFormat ?? "short",
    year: yearFormat ?? "numeric",
  });
};

export default formatLocalDate;
