import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Box, Text } from 'grommet';
import styled from 'styled-components';

import { CalendarCell } from '@/components/CalendarCell';
import { getDaysInMonth, getFirstDayOfMonth } from '@/utils/dates';
import { parseDateString } from '@/utils/api-parameters';

interface CalendarGridProps {
  days: Array<Application.Day>;
  year: number;
  month: number;
  animation: 'slideLeft' | 'slideRight' | undefined;
}

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 5px;
`;

const WeekDay = styled(Text).attrs(() => ({
  weight: 'bold',
  size: 'large',
  color: 'dark-6',
}))`
  text-align: center;
`;

export function CalendarGrid({ days, year, month, animation }: CalendarGridProps) {
  const { push } = useRouter();
  const [visible, setVisible] = useState(false);

  const numberOfDays = getDaysInMonth(year, month);
  const weekDayToBegin = getFirstDayOfMonth(year, month).number + 1;

  const handleClick = (dateString: string) => {
    const url = parseDateString(dateString);

    push(`/days/${url}`);
  };

  useEffect(() => {
    if (visible) {
      setVisible(false);
    }
  }, [year, month]);

  useEffect(() => {
    if (!visible) {
      setVisible(true);
    }
  }, [visible]);

  return (
    <>
      {visible && (
        <Box
          animation={[
            {
              type: animation,
              delay: 0,
              duration: 1000,
              size: 'medium',
            },
            {
              type: 'fadeIn',
              delay: 0,
              duration: 1000,
              size: 'medium',
            },
          ]}
          fill
          gap="medium"
        >
          <Grid>
            <WeekDay>D</WeekDay>
            <WeekDay>S</WeekDay>
            <WeekDay>T</WeekDay>
            <WeekDay>Q</WeekDay>
            <WeekDay>Q</WeekDay>
            <WeekDay>S</WeekDay>
            <WeekDay>S</WeekDay>
          </Grid>

          <Grid>
            {Array.from({ length: numberOfDays }, (_, v) => v + 1).map((day, i) => {
              const dayString = new Date(year, month, day).toISOString();
              const d = days.find((d) => d.date === dayString);

              return (
                <CalendarCell
                  key={i}
                  first={i === 0}
                  firstPosition={weekDayToBegin}
                  day={String(day)}
                  emoji={d?.emoji}
                  onClick={() => handleClick(dayString)}
                />
              );
            })}
          </Grid>
        </Box>
      )}
    </>
  );
}
