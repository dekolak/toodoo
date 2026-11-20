import fr, { type TexteKey } from './fr';

const textes: Record<string, Record<string, string>> = { fr };

let langue = 'fr';

export function setLangue(l: string) {
  langue = l;
}

export function t(key: TexteKey): string {
  return textes[langue]?.[key] ?? key;
}
