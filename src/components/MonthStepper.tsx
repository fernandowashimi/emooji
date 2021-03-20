import { Box, Button, Heading } from 'grommet';
import { Next, Previous } from 'grommet-icons';

import { getMonthName } from '@/utils/dates';

interface MonthStepperProps {
  date: {
    year: number;
    month: number;
  };
  onNextMonth: () => void;
  onPreviousMonth: () => void;
}

const today = new Date();
const initialMonth = today.getMonth();
const initialYear = today.getUTCFullYear();

export function MonthStepper({ date, onNextMonth, onPreviousMonth }: MonthStepperProps) {
  return (
    <Box
      fill="horizontal"
      direction="row"
      justify="between"
      align="center"
      pad={{ horizontal: 'small' }}
    >
      <Heading level="5" textAlign="center">
        📅 {getMonthName(date.month)} de {date.year}
      </Heading>
      <Box direction="row">
        <Button hoverIndicator icon={<Previous />} onClick={onPreviousMonth} />
        <Button
          hoverIndicator
          icon={<Next />}
          onClick={onNextMonth}
          disabled={date.month === initialMonth && date.year === initialYear}
        />
      </Box>
    </Box>
  );
}
