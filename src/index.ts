export const US_BING_HOST = 'www.bing.com';
export const CN_BING_HOST = 'cn.bing.com';
export const MARK_NAME = 'us-bing-trigger';
export const WAIT_TIME = 2000;
export function resolveURL(url?: URL | string) {
  const here = window.location.href;
  const urlObj = new URL(url ?? here, here);
  return urlObj;
}
export function isCNBing(url?: URL | string) {
  const urlObj = resolveURL(url);
  return (
    urlObj.host === CN_BING_HOST ||
    (urlObj.host === US_BING_HOST && urlObj.searchParams.get('mkt') === 'zh-CN')
  );
}
export function toUSBingURL(url?: URL | string) {
  const urlObj = resolveURL(url);
  urlObj.host = US_BING_HOST;
  const q = urlObj.searchParams.get('q') ?? '';
  urlObj.search = '';

  // Set cc=us to avoid redirecting to local Bing
  urlObj.searchParams.set('cc', 'us');
  // Restore the search query
  urlObj.searchParams.set('q', q);
  // Add `trigger-from` mark to avoid redirecting again
  urlObj.searchParams.set(MARK_NAME, '');

  return urlObj;
}
export function resolveMark() {
  const urlObj = resolveURL();
  const hasMark = urlObj.searchParams.has(MARK_NAME);
  if (hasMark) {
    urlObj.searchParams.delete(MARK_NAME);
    setTimeout(() => {
      window.history.replaceState({}, '', urlObj);
    }, WAIT_TIME);
  }
  return hasMark;
}

export function resolveRedirecting() {
  if (resolveMark()) {
    return;
  }
  if (isCNBing()) {
    window.location.replace(toUSBingURL());
  }
}

resolveRedirecting();
