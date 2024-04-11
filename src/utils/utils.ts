export const isNumber = (str: string) => {
  const num = parseFloat(str);
  return !isNaN(num);
};

export const validateStringArray = (arr: Array<unknown> | string) => {
  return (
    Array.isArray(arr) && arr.every((element) => typeof element === "string")
  );
};

export const getRandomInt = (min: number = 0, max: number = 100): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isBase64 = (value: string) =>
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(
    value,
  );
