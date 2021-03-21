const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export function getStandardDate(date: Date) {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);

  return newDate;
}

export function getDateBounds(date: Date) {
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = `000${date.getFullYear()}`.slice(-4);

  return [`${year}-01-01`, `${year}-${month}-${day}`];
}

export function getDaysInMonth(year: number, month: number) {
  const date = new Date(year, month + 1, 0);

  return date.getDate();
}

export function getFirstDayOfMonth(year: number, month: number) {
  const date = new Date(year, month, 1);

  return { number: date.getDay(), string: date.toISOString() };
}

export function getLastDayOfMonth(year: number, month: number) {
  const date = new Date(year, month + 1, 0);

  return { number: date.getDay(), string: date.toISOString() };
}

export function getMonthName(index: number) {
  return months[index];
}
