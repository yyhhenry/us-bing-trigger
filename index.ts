/**
 * The host of US Bing.
 */
const US_BING_HOST = "www.bing.com";
/**
 * The host of CN Bing.
 */
const CN_BING_HOST = "cn.bing.com";
/**
 * The mark added to the search query to avoid redirecting again.
 */
const MARK_NAME = "us-bing-trigger";
/**
 * Wait time before removing the mark from the URL.
 */
const WAIT_TIME = 2000;

/**
 * URL object of the current page.
 */
const urlObj = new URL(window.location.href);
/**
 * Check if the current page is CN Bing.
 * 
 * When the host is `cn.bing.com` or `mkt=zh-CN` is in the search query,
 */
function isCNBing() {
  return (
    urlObj.host === CN_BING_HOST ||
    (urlObj.host === US_BING_HOST && urlObj.searchParams.get("mkt") === "zh-CN")
  );
}
/**
 * Redirect to US Bing with the search query preserved,
 * and the mark will be added to the search query.
 */
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
/**
 * Check if the URL has the mark.
 */
function hasMark() {
  return urlObj.searchParams.has(MARK_NAME);
}
/**
 * Sleep for a while.
 */
function asyncSleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Remove the mark from the URL without reloading the page,
 * after a short delay.
 */
async function removeMark() {
  urlObj.searchParams.delete(MARK_NAME);
  const newURL = urlObj.href;
  await asyncSleep(WAIT_TIME);
  window.history.replaceState({}, "", newURL);
}

/**
 * Redirect to US Bing with mark in search query,
 * or log a message when the mark is detected.
 * 
 * When the mark is detected and the page is still CN Bing,
 * that means we failed to redirect to US Bing last time.
 */
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
