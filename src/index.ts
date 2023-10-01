function getCurrentURL() {
  return new URL(window.location.href);
}
function isCNBing() {
  const url = getCurrentURL();
  return (
    url.host === 'cn.bing.com' ||
    (url.host == 'www.bing.com' && url.searchParams.get('mkt') === 'zh-CN')
  );
}
function generateUSBingURL() {
  const url = getCurrentURL();
  url.host = 'www.bing.com';
  const q = url.searchParams.get('q') ?? '';
  url.search = '';

  // Set cc=us to avoid redirecting to local Bing
  url.searchParams.set('cc', 'us');
  // Restore the search query
  url.searchParams.set('q', q);

  return url;
}
if (isCNBing()) {
  window.location.replace(generateUSBingURL());
}
