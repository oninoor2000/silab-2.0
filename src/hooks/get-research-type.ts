import type { PortfolioType } from "@prisma/client";

/**
 * Converts a `Portfolio Type` enum value to the corresponding unit name in Indonesian.
 * This function maps pricing units from the database to their Indonesian equivalents.
 *
 * @param type - Type of research portfolio.
 * @returns The name of the type in Indonesian.
 * @throws Will throw an error if the unit value is not recognized.
 */

export function getResearchType(type: PortfolioType): string {
  switch (type) {
    case "COMMUNITY_SERVICE":
      return "Pengabdian Masyarakat";
    case "PROJECT":
      return "Project";
    case "RESEARCH":
      return "Penelitian";
    default:
      // Gunakan String(type) untuk memastikan tipe string dihasilkan pada error
      throw new Error(`Invalid Unit value: ${String(type)}`);
  }
}
