const EmojiValue: Application.Map<{ value: string; name: string }> = {
  1: { value: 'ð', name: 'triste / deprimido' },
  2: { value: 'ð ', name: 'zangado / irritado' },
  3: { value: 'ðĪ', name: 'cansado / doente' },
  4: { value: 'ð°', name: 'nervoso / ansioso' },
  5: { value: 'ð', name: 'normal / mediano' },
  6: { value: 'ð', name: 'calmo / relaxado' },
  7: { value: 'ð', name: 'produtivo / motivado' },
  8: { value: 'ð', name: 'animado / contente' },
  9: { value: 'ð', name: 'feliz / alegre' },
};

const emojis = [
  {
    value: 'ð',
    name: 'grinning face',
  },
  {
    value: 'ð',
    name: 'grinning face with big eyes',
  },
  {
    value: 'ð',
    name: 'grinning face with smiling eyes',
  },
  {
    value: 'ð',
    name: 'beaming face with smiling eyes',
  },
  {
    value: 'ð',
    name: 'grinning squinting face',
  },
  {
    value: 'ð',
    name: 'grinning face with sweat',
  },
  {
    value: 'ðĪĢ',
    name: 'rolling on the floor laughing',
  },
  {
    value: 'ð',
    name: 'face with tears of joy',
  },
  {
    value: 'ð',
    name: 'slightly smiling face',
  },
  {
    value: 'ð',
    name: '	winking face',
  },
  {
    value: 'ð',
    name: 'smiling face with smiling eyes',
  },
  {
    value: 'ð',
    name: '	smiling face with halo',
  },
  {
    value: 'ðĨ°',
    name: 'smiling face with hearts',
  },
  {
    value: 'ð',
    name: 'smiling face with heart-eyes',
  },
  {
    value: 'ðĪĐ',
    name: 'star-struck',
  },
  {
    value: 'ð',
    name: '	face with tongue',
  },
  {
    value: 'ð',
    name: 'winking face with tongue',
  },
  {
    value: 'ðĪŠ',
    name: 'zany face',
  },
  {
    value: 'ð',
    name: 'squinting face with tongue',
  },
  {
    value: 'ðĪ',
    name: 'hugging face',
  },
  {
    value: 'ðĪ',
    name: 'thinking face',
  },
  {
    value: 'ðĪŊ',
    name: 'exploding head',
  },
  {
    value: 'ðĪ ',
    name: 'cowboy hat face',
  },
  {
    value: 'ðĨģ',
    name: 'partying face',
  },
  {
    value: 'ð',
    name: 'smiling face with sunglasses',
  },
  {
    value: 'ðĪ',
    name: 'nerd face',
  },
  {
    value: 'ð§',
    name: '	face with monocle',
  },
  {
    value: 'ðĐ',
    name: 'pile of poo',
  },
  {
    value: 'ðĪĄ',
    name: 'clown face',
  },
];

export function getRandomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

export function getEmojiByValue(value: number) {
  return EmojiValue[value];
}
