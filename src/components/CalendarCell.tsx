import { useContext } from 'react';

import { Box, ResponsiveContext, Text } from 'grommet';
import styled from 'styled-components';

import { getEmojiByValue } from '@/utils/emojis';

interface CalendarCellProps {
  first: boolean;
  firstPosition: number;
  day: string;
  emoji?: number;
  onClick: () => void;
}

interface StyledCellProps {
  first: boolean;
  firstPosition: number;
}

const Cell = styled(Box)<StyledCellProps>`
  position: relative;
  ${({ first, firstPosition }) => first && `grid-column-start: ${firstPosition}`};
`;

const Day = styled(Box)`
  position: absolute;
  left: 0;
  top: 0;
`;

export function CalendarCell({ first, firstPosition, day, emoji, onClick }: CalendarCellProps) {
  const size = useContext(ResponsiveContext);

  return (
    <Cell
      hoverIndicator
      align="center"
      round="small"
      pad={{ vertical: '25%' }}
      first={first}
      firstPosition={firstPosition}
      onClick={onClick}
    >
      <Day pad={{ horizontal: size === 'small' ? '0' : '15px' }}>
        <Text color="light-6" size={size === 'small' ? 'xsmall' : 'medium'}>
          {day}
        </Text>
      </Day>
      <Box
        animation={{
          type: 'slideUp',
          delay: 200,
          duration: 1000,
          size: 'large',
        }}
        height={{ min: '32px' }}
      >
        {emoji && (
          <Text size={size === 'small' ? 'medium' : 'xlarge'}>{getEmojiByValue(emoji).value}</Text>
        )}
      </Box>
    </Cell>
  );
}
