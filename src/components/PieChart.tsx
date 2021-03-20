import { ResponsivePie } from '@nivo/pie';

import { groupBy } from '@/utils/arrays';
import { parseDaysToPieChartData } from '@/utils/charts';

interface PieChartProps {
  data: Array<Application.Day>;
}

export function PieChart({ data }: PieChartProps) {
  const groupedData = groupBy(data, 'emoji');
  const chartData = parseDaysToPieChartData(groupedData);

  return (
    <ResponsivePie
      sortByValue
      data={chartData}
      margin={{ top: 30, right: 0, bottom: 80, left: 0 }}
    />
  );
}
