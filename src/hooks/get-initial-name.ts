/**
 * Retrieves the initials from a name, with a maximum of two letters.
 * @param name - Full name
 * @returns The initials of the name (maximum of two letters)
 */
export function getNameInitials(name: string): string {
  // Remove whitespace from the beginning and end, then split the name into an array
  const nameParts = name.trim().split(/\s+/);

  if (nameParts.length === 0) {
    return "";
  }

  if (nameParts.length === 1) {
    // If there's only one word, take the first two letters (or one if there's only one letter)
    return nameParts[0]!.substring(0, 2).toUpperCase();
  }

  // Take the first letter of the first word and the first letter of the last word
  const firstInitial = nameParts[0]![0];
  const lastInitial = nameParts[nameParts.length - 1]![0];

  return (firstInitial! + lastInitial).toUpperCase();
}

// Example usage:
// console.log(getNameInitials("John Doe")); // Output: "JD"
// console.log(getNameInitials("Alice")); // Output: "AL"
// console.log(getNameInitials("Robert John Doe")); // Output: "RD"
// console.log(getNameInitials("")); // Output: ""
// console.log(getNameInitials("A")); // Output: "A"
