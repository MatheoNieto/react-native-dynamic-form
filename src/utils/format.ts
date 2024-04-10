import dayjs from "dayjs";
// @ts-ignore
import utc from "dayjs-plugin-utc";

dayjs.extend(utc);

export const formatDate = (
  value: dayjs.ConfigType | undefined,
  format = "DD-MM-YYYY",
  inputFormat: string | undefined = undefined,
): string => dayjs(value, inputFormat || undefined).format(format);

export const getDayFromDate = (value: dayjs.ConfigType): number =>
  dayjs(value).daysInMonth();
