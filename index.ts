const US_BING_HOST = "www.bing.com";
const CN_BING_HOST = "cn.bing.com";
const MARK_NAME = "us-bing-trigger";
const WAIT_TIME = 2000;

const urlObj = new URL(window.location.href);

function isCNBing() {
  return (
    urlObj.host === CN_BING_HOST ||
    (urlObj.host === US_BING_HOST && urlObj.searchParams.get("mkt") === "zh-CN")
  );
}
function redirectToUSBing() {
  urlObj.host = US_BING_HOST;
  const q = urlObj.searchParams.get("q") ?? "";
  urlObj.search = "";

  // Set cc=us to avoid redirecting to local Bing
  urlObj.searchParams.set("cc", "us");
  // Restore the search query
  urlObj.searchParams.set("q", q);
  // Add `trigger-from` mark to avoid redirecting again
  urlObj.searchParams.set(MARK_NAME, "");

  window.location.replace(urlObj);
}
function hasMark() {
  return urlObj.searchParams.has(MARK_NAME);
}
function asyncSleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function removeMark() {
  urlObj.searchParams.delete(MARK_NAME);
  const newURL = urlObj.href;
  await asyncSleep(WAIT_TIME);
  window.history.replaceState({}, "", newURL);
}

async function redirectIfPossible() {
  if (hasMark()) {
    await removeMark();
    if (isCNBing()) {
      console.info("Seems like you don't have a VPN.");
    } else {
      console.info("Redirected to US Bing.");
    }
  } else if (isCNBing()) {
    console.info("Redirecting to US Bing...");
    redirectToUSBing();
  }
}

redirectIfPossible();
