/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;


self.addEventListener('install', (event:any) => {
    console.log("install")
});


self.addEventListener('fetch', (event:any) => {
    // ignore POST requests etc
    if (event.request.method !== 'GET') return;
    const url = new URL(event.request.url);
    if(!url.href.startsWith("https://avatar.maplestory.nexon.com/ItemIcon")) return;

    async function respond() {
        //item 이미지는 절대 변경되지 않으므로 item에 한하여 cache-first 전략 사용
        const cache = await caches.open(CACHE);
        let res = await cache.match(event.request);

        if (res !== undefined) {
            return res;
        } else {
            const response = await fetch(event.request);
            if (response.status === 0)
                cache.put(event.request, response.clone());
            return response;
        }
    }
    event.respondWith(respond());
});
