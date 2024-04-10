import moment from "moment";

export const formatDate = (
  value: string,
  isTime = false,
  format?: string,
): string => {
  let formatValue = format;
  if (!value) return "";

  if (!format) {
    formatValue = isTime ? "HH:mm:ss" : "DD/MM/YYYY";
  }

  const currentFormat = detectFormat(value.toString(), isTime);
  return moment(value, currentFormat).format(formatValue);
};
/*
DD MMM YYYY
MM/DD/YYYY
DD/MM/YYYY
YYYY-MM-DD
*/
const arraysRegexDates = [
  /\d{2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}/g,
  /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/g,
  /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/g,
  /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/g,
];
/*
h:mm:ss a
h:mm A
*/
const arraysRegexTimes = [
  /^(0?[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9] (AM|PM)$/g,
  /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/g,
];

const formatsDate = {
  "0": "DD MMM YYYY",
  "1": "MM/DD/YYYY",
  "2": "DD/MM/YYYY",
  "3": "YYYY-MM-DD",
};

const formatsTime = {
  "0": "h:mm:ss a",
  "1": "h:mm A",
};

type keysFormatDate = "1" | "2" | "3" | "0";
type keysFormatTime = "1" | "0";

const detectFormat = (valueDate: string, isTime = false) => {
  if (isTime) {
    const indexPatternTime = arraysRegexTimes.findIndex((pattern) =>
      pattern.test(valueDate),
    );
    return formatsTime[indexPatternTime.toString() as keysFormatTime];
  }
  const indexPatternDate = arraysRegexDates.findIndex((pattern) =>
    pattern.test(valueDate),
  );
  return formatsDate[indexPatternDate.toString() as keysFormatDate];
};
