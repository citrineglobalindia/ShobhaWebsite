"use client";
import { useEffect } from "react";

const CR_URL = "https://kjegcgnraahyubfnvqte.supabase.co/functions/v1/web-analytics-intake";
const CR_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqZWdjZ25yYWFoeXViZm52cXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzA1MzksImV4cCI6MjA5Nzk0NjUzOX0.EbuOY5ZW9Xyl6DbKUzwVxxwZqX012Pk2DP4gMp2WVc0";
const SITE_KEY = "shobha-c075fb521a";

function uid() { try { return (crypto.randomUUID && crypto.randomUUID()) || String(Math.random()).slice(2); } catch (e) { return String(Date.now()) + Math.random(); } }
function getVid() { try { let v = localStorage.getItem("cr_vid"); if (!v) { v = uid(); localStorage.setItem("cr_vid", v); } return v; } catch (e) { return "anon"; } }
function getSid() { try { let v = sessionStorage.getItem("cr_sid"); if (!v) { v = uid(); sessionStorage.setItem("cr_sid", v); } return v; } catch (e) { return "s"; } }
function send(events) {
  try {
    fetch(CR_URL, { method: "POST", keepalive: true, headers: { "Content-Type": "application/json", apikey: CR_ANON, Authorization: "Bearer " + CR_ANON }, body: JSON.stringify({ key: SITE_KEY, vid: getVid(), sid: getSid(), events }) }).catch(function () {});
  } catch (e) {}
}

export default function CrAnalytics() {
  useEffect(function () {
    if (typeof window === "undefined") return;
    let start = Date.now();
    let path = window.location.pathname;
    function flush() { const d = Date.now() - start; if (d > 1000) send([{ kind: "time", path: path, duration_ms: d }]); start = Date.now(); }
    function pageview() { start = Date.now(); path = window.location.pathname; send([{ kind: "pageview", path: path, ref: (document && document.referrer) || "" }]); }
    function onVis() { if (document.visibilityState === "hidden") flush(); else start = Date.now(); }
    function onClick(e) {
      const t = e.target; const a = t && t.closest ? t.closest("a,button,[data-track]") : null; if (!a) return;
      let label = (a.getAttribute && (a.getAttribute("data-track") || a.getAttribute("aria-label"))) || ((a.innerText || a.textContent || "").trim().slice(0, 80)) || (a.getAttribute && a.getAttribute("href")) || a.tagName;
      send([{ kind: "click", path: path, label: label }]);
    }
    const _ps = window.history.pushState, _rs = window.history.replaceState;
    function wrap(fn) { return function () { flush(); const r = fn.apply(this, arguments); setTimeout(pageview, 0); return r; }; }
    try { window.history.pushState = wrap(_ps); window.history.replaceState = wrap(_rs); } catch (e) {}
    window.addEventListener("popstate", function () { flush(); setTimeout(pageview, 0); });
    document.addEventListener("visibilitychange", onVis);
    document.addEventListener("click", onClick, true);
    window.addEventListener("pagehide", flush);
    pageview();
    return function () {
      document.removeEventListener("visibilitychange", onVis);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pagehide", flush);
      try { window.history.pushState = _ps; window.history.replaceState = _rs; } catch (e) {}
      flush();
    };
  }, []);
  return null;
}
