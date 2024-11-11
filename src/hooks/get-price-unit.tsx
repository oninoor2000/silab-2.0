import { Unit } from "@prisma/client";

/**
 * Converts a `Unit` enum value to the corresponding unit name in Indonesian.
 * This function maps pricing units from the database to their Indonesian equivalents.
 *
 * @param unit - The unit of measure as an enum value.
 * @returns The name of the unit in Indonesian.
 * @throws Will throw an error if the unit value is not recognized.
 */
export function getUnitPrice(unit: Unit): string {
  switch (unit) {
    case Unit.PER_HOUR:
      return "Per Jam";
    case Unit.PER_DAY:
      return "Per Hari";
    case Unit.PER_3_MONTHS:
      return "Per 3 Bulan";
    case Unit.PER_1_7_DAYS:
      return "Per 1-7 Hari";
    case Unit.PER_PACKAGE:
      return "Per Paket";
    case Unit.PER_WEEK:
      return "Per Minggu";
    case Unit.PER_USAGE:
      return "Per Penggunaan";
    case Unit.PER_PC_DAY:
      return "Per PC per Hari";
    case Unit.PER_MONTH:
      return "Per Bulan";
    case Unit.PER_ANALYSIS:
      return "Per Analisis";
    case Unit.PER_MOUSE:
      return "Per Tikus";
    case Unit.PER_SAMPLE:
      return "Per Sampel";
    case Unit.PER_ANIMAL:
      return "Per Hewan";
    case Unit.PER_PERSON:
      return "Per Orang";
    case Unit.PER_14_MEETINGS:
      return "Per 14 Pertemuan";
    case Unit.PER_28_MEETINGS:
      return "Per 28 Pertemuan";
    case Unit.PER_7_MEETINGS:
      return "Per 7 Pertemuan";
    case Unit.PER_1_METHOD_3_MEETINGS:
      return "Per Metode (3 Pertemuan)";
    case Unit.PER_12_MEETINGS:
      return "Per 12 Pertemuan";
    case Unit.PER_STUDENT:
      return "Per Siswa";
    case Unit.PER_ACTIVITY_DAY_PERSON:
      return "Per Hari Aktivitas per Orang";
    case Unit.PER_PERSON_DAY:
      return "Per Orang per Hari";
    case Unit.STARTING_FROM:
      return "Mulai Dari";
    case Unit.PER_DESIGN_METER:
      return "Per Meter Desain";
    case Unit.PER_APPLICATION:
      return "Per Aplikasi";
    case Unit.PER_FORM:
      return "Per Formulir";
    case Unit.PER_REPORT:
      return "Per Laporan";
    case Unit.PER_RESPONDENT:
      return "Per Responden";
    case Unit.PER_PERSON_MONTH:
      return "Per Orang per Bulan";
    case Unit.PER_PERSON_2_HOURS:
      return "Per Orang per 2 Jam";
    case Unit.PER_VIDEO:
      return "Per Video";
    case Unit.PER_MATERIAL:
      return "Per Materi";
    case Unit.PER_AD:
      return "Per Iklan";
    case Unit.PER_PROTOTYPE:
      return "Per Prototipe";
    case Unit.PER_DESIGN:
      return "Per Desain";
    default:
      // Gunakan String(unit) untuk memastikan tipe string dihasilkan pada error
      throw new Error(`Invalid Unit value: ${String(unit)}`);
  }
}
