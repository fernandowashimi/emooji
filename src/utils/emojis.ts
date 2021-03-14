const EmojiValue: Application.Map<{ value: string; name: string }> = {
  1: { value: '😞', name: 'triste / deprimido' },
  2: { value: '😠', name: 'zangado / irritado' },
  3: { value: '🤒', name: 'cansado / doente' },
  4: { value: '😰', name: 'nervoso / ansioso' },
  5: { value: '😐', name: 'normal / mediano' },
  6: { value: '😌', name: 'calmo / relaxado' },
  7: { value: '🙂', name: 'produtivo / motivado' },
  8: { value: '😊', name: 'animado / contente' },
  9: { value: '😃', name: 'feliz / alegre' },
};

const emojis = [
  {
    value: '😀',
    name: 'grinning face',
  },
  {
    value: '😃',
    name: 'grinning face with big eyes',
  },
  {
    value: '😄',
    name: 'grinning face with smiling eyes',
  },
  {
    value: '😁',
    name: 'beaming face with smiling eyes',
  },
  {
    value: '😆',
    name: 'grinning squinting face',
  },
  {
    value: '😅',
    name: 'grinning face with sweat',
  },
  {
    value: '🤣',
    name: 'rolling on the floor laughing',
  },
  {
    value: '😂',
    name: 'face with tears of joy',
  },
  {
    value: '🙂',
    name: 'slightly smiling face',
  },
  {
    value: '😉',
    name: '	winking face',
  },
  {
    value: '😊',
    name: 'smiling face with smiling eyes',
  },
  {
    value: '😇',
    name: '	smiling face with halo',
  },
  {
    value: '🥰',
    name: 'smiling face with hearts',
  },
  {
    value: '😍',
    name: 'smiling face with heart-eyes',
  },
  {
    value: '🤩',
    name: 'star-struck',
  },
  {
    value: '😛',
    name: '	face with tongue',
  },
  {
    value: '😜',
    name: 'winking face with tongue',
  },
  {
    value: '🤪',
    name: 'zany face',
  },
  {
    value: '😝',
    name: 'squinting face with tongue',
  },
  {
    value: '🤗',
    name: 'hugging face',
  },
  {
    value: '🤔',
    name: 'thinking face',
  },
  {
    value: '🤯',
    name: 'exploding head',
  },
  {
    value: '🤠',
    name: 'cowboy hat face',
  },
  {
    value: '🥳',
    name: 'partying face',
  },
  {
    value: '😎',
    name: 'smiling face with sunglasses',
  },
  {
    value: '🤓',
    name: 'nerd face',
  },
  {
    value: '🧐',
    name: '	face with monocle',
  },
  {
    value: '💩',
    name: 'pile of poo',
  },
  {
    value: '🤡',
    name: 'clown face',
  },
];

export function getRandomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

export function getEmojiByValue(value: number) {
  return EmojiValue[value];
}
