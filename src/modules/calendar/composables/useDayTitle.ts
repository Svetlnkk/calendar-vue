import { LANG, firstLetterToUpperCase } from '@/lib';

export const useDayTitle = (date: Date): string => {
  const dateStr = date.toLocaleDateString(LANG, {
    day: '2-digit',
    month: 'long',
    weekday: 'short',
    year: 'numeric'
  });

  const result = dateStr.match(/^(.{2}), (.+) г.$/);
  if (result) {
    return `${result[2]} (${firstLetterToUpperCase(result[1])})`;
  }

  return '';
};
