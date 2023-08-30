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
  url.searchParams.delete('mkt');
  url.searchParams.set('cc', 'us');
  return url;
}
if (isCNBing()) {
  window.location.replace(generateUSBingURL());
}
