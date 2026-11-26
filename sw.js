/* 무신사 수금 현황 — 앱 설치용 서비스워커.
   오프라인 캐시는 하지 않는다: 잠금 페이지의 build-id 새 버전 감지와 구글시트 실시간 로드를 그대로 두기 위해
   같은 주소의 GET만 네트워크로 그대로 전달하고, 시트 저장(다른 주소·POST)은 건드리지 않는다. */
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(e){
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(fetch(req));
});
