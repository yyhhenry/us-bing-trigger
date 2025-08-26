/**
 * The mark added to the search query to avoid redirecting again.
 */
const MARK_NAME = "us-bing-trigger";

/**
 * Wait time before removing the mark from the URL.
 */
const WAIT_TIME = 2000;

/**
 * Sleep for a while.
 */
function asyncSleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if the current page is CN Bing.
 */
function isCNBing(url: URL) {
  if (url.host === "www.bing.com") {
    return (
      url.searchParams.get("mkt")?.toLowerCase() === "zh-cn" ||
      url.searchParams.get("cc")?.toLowerCase() === "cn"
    );
  }
  return url.host === "cn.bing.com";
}

/**
 * Redirect to US Bing with the search query preserved,
 * and the mark will be added to the search query.
 */
function redirectToUSBing(url: URL) {
  const target = new URL(url.pathname, "https://www.bing.com");
  const q = target.searchParams.get("q") ?? "";

  // Set cc=us to avoid redirecting to local Bing
  target.searchParams.set("cc", "us");
  // Restore the search query
  target.searchParams.set("q", q);
  // Add `trigger-from` mark to avoid redirecting again
  target.searchParams.set(MARK_NAME, "");

  window.location.replace(target);
}

/**
 * Check if the URL has the mark.
 */
function hasMark(url: URL) {
  return url.searchParams.has(MARK_NAME);
}

/**
 * Remove the mark without reloading
 */
function removeMark(url: URL) {
  const target = new URL(url.href);
  target.searchParams.delete(MARK_NAME);
  window.history.replaceState({}, "", target);
}

/**
 * Redirect to US Bing if possible
 */
async function redirectIfPossible() {
  const url = new URL(window.location.href);
  if (hasMark(url)) {
    // Wait for a stable state
    await asyncSleep(WAIT_TIME);

    removeMark(url);
    if (isCNBing(url)) {
      console.info("Cannot access US Bing.");
    } else {
      console.info("Redirected to US Bing.");
    }
  } else if (isCNBing(url)) {
    console.info("Redirecting to US Bing...");
    redirectToUSBing(url);
  }
}

redirectIfPossible();
