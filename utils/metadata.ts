export interface ScriptMetadata {
  name: string;
  author: string;
  /**
   * The GitHub repository URL, used in namespace and homepage.
   * By default, it is generated from the author and name.
   */
  github?: string;
  /**
   * The URL to download the latest version of the script.
   * By default, it is generated from the GitHub repository.
   */
  download?: string;

  version: string;
  description: string;

  icon: string;
  match: string[];
  grant?: string[];

  noframes?: boolean;

  any?: Record<string, string>;
}

export function iconFromDomain(domain: string): string {
  const url = new URL("https://www.google.com/s2/favicons");
  url.searchParams.set("sz", "64");
  url.searchParams.set("domain", domain);
  return url.href;
}

export function generateBanner(metadata: ScriptMetadata): string {
  const github =
    metadata.github ?? `https://github.com/${metadata.author}/${metadata.name}`;
  const download =
    metadata.download ??
    `${github}/releases/latest/download/${metadata.name}.user.js`;

  const results: string[] = [];
  results.push("// ==UserScript==");

  const pushKV = (key: string, value: string) =>
    results.push(`// @${key.padEnd(12)} ${value}`);

  pushKV("name", metadata.name);
  pushKV("namespace", github);
  pushKV("version", metadata.version);
  pushKV("description", metadata.description);

  pushKV("author", metadata.author);
  pushKV("homepage", github);
  pushKV("updateURL", download);
  pushKV("downloadURL", download);

  pushKV("icon", metadata.icon);
  if (metadata.match.length === 0) {
    throw new Error("At least one match pattern is required.");
  }
  for (const match of metadata.match) {
    pushKV("match", match);
  }
  if (metadata.grant) {
    for (const grant of metadata.grant) {
      pushKV("grant", grant);
    }
  } else {
    pushKV("grant", "none");
  }
  if (metadata.noframes) {
    pushKV("noframes", "");
  }

  results.push("// ==/UserScript==");
  return results.join("\n");
}
