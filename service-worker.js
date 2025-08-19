const a = "1755644899474", o = `cache-${a}`;
self.addEventListener("install", (e) => {
  console.log("install");
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || !new URL(e.request.url).href.startsWith("https://avatar.maplestory.nexon.com/ItemIcon"))
    return;
  async function n() {
    const s = await caches.open(o);
    let r = await s.match(e.request);
    if (r !== void 0)
      return r;
    {
      const t = await fetch(e.request);
      return t.status === 0 && s.put(e.request, t.clone()), t;
    }
  }
  e.respondWith(n());
});
