export function parseDateParam(param: string | string[] | undefined) {
  if (!param) return undefined;
  if (Array.isArray(param)) return undefined;
  if (param.length !== 8) return undefined;

  const day = Number(param.slice(0, 2));
  const month = Number(param.slice(2, 4));
  const year = Number(param.slice(4, 8));

  const dateString = `${year}-${month}-${day}`;

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return undefined;

  return dateString;
}

export function parseDateString(string: string) {
  const date = new Date(string);

  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = `000${date.getFullYear()}`.slice(-4);

  return `${day}${month}${year}`;
}
