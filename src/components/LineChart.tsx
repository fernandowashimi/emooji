import { ResponsiveLine, Point } from '@nivo/line';

import { parseDaysToLineChartData } from '@/utils/charts';
import { getEmojiByValue } from '@/utils/emojis';

interface LineChartProps {
  data: Array<Application.Day>;
  id: number;
}

export function LineChart({ data, id }: LineChartProps) {
  const chartData = parseDaysToLineChartData(data, id);

  return (
    <ResponsiveLine
      enablePointLabel
      useMesh
      data={chartData}
      margin={{ left: 30, right: 30, bottom: 70, top: 20 }}
      lineWidth={8}
      axisLeft={null}
      axisBottom={{
        tickRotation: -40,
      }}
      pointLabel={(d: Point['data']) => getEmojiByValue(d.y as number).value}
      pointLabelYOffset={5}
    />
  );
}
