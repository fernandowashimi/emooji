import { getEmojiByValue } from '@/utils/emojis';

export function parseDaysToLineChartData(days: Array<Application.Day>, id: number) {
  return [
    {
      id,
      data: days.map((d) => {
        const day = new Date(d.date);
        const dd = `0${day.getDate()}`.slice(-2);
        const mm = `0${day.getMonth() + 1}`.slice(-2);

        return {
          x: `${dd}/${mm}`,
          y: d.emoji,
        };
      }),
    },
  ];
}

export function parseDaysToPieChartData(days: Record<string, Application.Day[]>) {
  return Object.entries(days).map((d) => ({
    id: getEmojiByValue(Number(d[0])).value,
    label: getEmojiByValue(Number(d[0])).name,
    value: d[1].length,
  }));
}
