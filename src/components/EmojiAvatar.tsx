import { memo } from 'react';

import { Avatar, Text } from 'grommet';

import { getRandomEmoji } from '@/utils/random-emoji';

export const EmojiAvatar = memo(() => {
  const emoji = getRandomEmoji();

  return (
    <Avatar background="brand">
      <Text id="random-emoji" role="img" size="24px" a11yTitle={emoji.name}>
        {emoji.value}
      </Text>
    </Avatar>
  );
});
