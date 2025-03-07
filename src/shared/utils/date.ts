export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  return new Intl.DateTimeFormat('en-UK', options).format(date);
};
