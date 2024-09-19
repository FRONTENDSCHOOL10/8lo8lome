export function getQueryString(params) {
  return new URLSearchParams(Object.entries(params)).toString();
}
