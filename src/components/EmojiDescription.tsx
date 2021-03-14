import { Box, Button, Text } from 'grommet';
import { Edit } from 'grommet-icons';

import { getEmojiByValue } from '@/utils/emojis';

interface EmojiDescriptionProps {
  value: number;
  editable?: boolean;
  onEdit?: () => void;
}

export function EmojiDescription({ value, editable = false, onEdit }: EmojiDescriptionProps) {
  const emoji = getEmojiByValue(value);

  return (
    <Box
      direction="row"
      justify="between"
      pad="small"
      round="small"
      animation={{ type: 'fadeIn', duration: 1000 }}
      border={{ color: 'border', size: 'small', style: 'solid', side: 'all' }}
    >
      <Box direction="row" align="center" gap="small">
        <Text size="2xl">{emoji.value}</Text>
        <Text size="xl">{emoji.name}</Text>
      </Box>
      {editable && (
        <Box>
          <Button
            icon={<Edit />}
            tip={{ content: 'alterar', dropProps: { align: { bottom: 'top' } } }}
            onClick={onEdit}
          />
        </Box>
      )}
    </Box>
  );
}
