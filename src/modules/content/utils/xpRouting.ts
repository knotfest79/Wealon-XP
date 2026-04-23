"use client";

export function setXpModeCookie() {
  document.cookie = "wealon_xp_mode=1; path=/; SameSite=Lax";
}

export function setCanonicalForPath(path: string) {
  const href = `${window.location.origin}${path}`;
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = href;
}

export function pushXpPath(path: string, state: Record<string, string>) {
  setXpModeCookie();
  setCanonicalForPath(path);

  if (window.location.pathname !== path) {
    window.history.pushState(state, "", path);
  }
}

export function replaceXpPath(path: string, state: Record<string, string> = {}) {
  setXpModeCookie();
  setCanonicalForPath(path);

  if (window.location.pathname !== path) {
    window.history.replaceState(state, "", path);
  }
}
