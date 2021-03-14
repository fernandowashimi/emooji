import { useEffect, useState } from 'react';

import { Box, RangeInput, RangeInputProps, Text, Tip } from 'grommet';
import styled from 'styled-components';

import { EmojiDescription } from '@/components/EmojiDescription';
import { getEmojiByValue } from '@/utils/emojis';

type EmojiRangeProps = RangeInputProps &
  React.ClassAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement>;

interface StyledEmojiProps {
  position: number;
}

const EmojiPosition: Application.Map<string> = {
  1: 'left: 0',
  2: 'left: calc(12.5% - 4px)',
  3: 'left: calc(25% - 7px)',
  4: 'left: calc(37.5% - 10px)',
  5: 'left: calc(50% - 13px)',
  6: 'left: calc(62.5% - 16px)',
  7: 'left: calc(75% - 19px)',
  8: 'left: calc(87.5% - 22px)',
  9: 'left: calc(100% - 25px)',
};

const Emoji = styled(Text)<StyledEmojiProps>`
  ${({ position }) => EmojiPosition[position]};
  position: absolute;
  font-size: 22px;
`;

export function EmojiRange(props: EmojiRangeProps) {
  const [visible, setVisible] = useState(false);

  const value = Number(props.value);
  const emoji = getEmojiByValue(value);

  useEffect(() => {
    if (visible) {
      setVisible(false);
    }
  }, [props.value]);

  useEffect(() => {
    if (!visible) {
      setVisible(true);
    }
  }, [visible]);

  return (
    <Box>
      <Box height="40px" justify="center">
        {visible && (
          <Box
            height="32px"
            animation={{ type: 'slideUp', duration: 400 }}
            style={{ position: 'relative' }}
          >
            <Tip content={emoji.name} dropProps={{ align: { left: 'right' } }}>
              <Emoji position={value}>{emoji.value}</Emoji>
            </Tip>
          </Box>
        )}
      </Box>

      <RangeInput {...props} />

      <Box height="80px" justify="center" margin={{ top: 'medium' }}>
        {visible && <EmojiDescription value={value} />}
      </Box>
    </Box>
  );
}
