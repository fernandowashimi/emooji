import { useEffect, useState } from 'react';

import { Box, RangeInput, RangeInputProps, Text, Tip } from 'grommet';
import styled from 'styled-components';

type EmojiRangeProps = RangeInputProps &
  React.ClassAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement>;

interface StyledEmojiProps {
  position: number;
}

interface Map<T> {
  [key: number]: T;
}

const EmojiPosition: Map<string> = {
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

const EmojiValue: Map<{ value: string; name: string }> = {
  1: { value: '😞', name: 'Triste / Deprimido' },
  2: { value: '😠', name: 'Zangado / Irritado' },
  3: { value: '🤒', name: 'Cansado / Doente' },
  4: { value: '😰', name: 'Nervoso / Ansioso' },
  5: { value: '😐', name: 'Normal / Mediano' },
  6: { value: '😌', name: 'Calmo / Relaxado' },
  7: { value: '🙂', name: 'Produtivo / Motivado' },
  8: { value: '😊', name: 'Animado / Contente' },
  9: { value: '😃', name: 'Feliz / Alegre' },
};

const Emoji = styled(Text)<StyledEmojiProps>`
  ${({ position }) => EmojiPosition[position]};
  position: absolute;
  font-size: 22px;
`;

export function EmojiRange(props: EmojiRangeProps) {
  const [visible, setVisible] = useState(false);

  const value = Number(props.value);
  const emoji = EmojiValue[value];

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
        {visible && (
          <Box
            direction="row"
            align="center"
            gap="small"
            pad="small"
            round="small"
            animation={{ type: 'fadeIn', duration: 1000 }}
            border={{ color: 'border', size: 'small', style: 'solid', side: 'all' }}
          >
            <Text size="2xl">{emoji.value}</Text>
            <Text size="xl">{emoji.name}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
