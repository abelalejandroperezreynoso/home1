export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[,\.]/g, '') // Remove commas and periods
    .trim(); // Remove leading/trailing whitespace
}