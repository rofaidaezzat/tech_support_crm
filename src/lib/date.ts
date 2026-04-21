import { format, parseISO, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: string | Date, dateFormat: string = 'PPP'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, dateFormat);
};

export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

export { format, parseISO, formatDistanceToNow };
