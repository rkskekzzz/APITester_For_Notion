import isUrl from 'is-url-superb';

export function validUrl(string) {
  if (!string) throw new Error('url');
  if (!isUrl(string)) throw new Error('url');
  return string;
}

export function validHeader(string) {
  let headers;

  if (!string) return '';
  try {
    headers = JSON.parse(string);
  } catch (error) {
    throw new Error('header');
  }
  if (typeof headers !== 'object' || Array.isArray(headers))
    throw new Error('header');
  for (let key in headers)
    if (typeof headers[key] !== 'string') throw new Error('header');
  return headers;
}

export function validBody(string) {
  let body;

  try {
    body = JSON.parse(string);
  } catch {
    body = '';
  }
  return body;
}
