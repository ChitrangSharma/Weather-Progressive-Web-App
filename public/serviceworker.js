const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];
const self=this;

// install CW 

self.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache)=>{
            console.log("opened cache");
            return cache.addAll(urlsToCache);
        
        
        })
    )
} );


self.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request)
        .then(()=>{
            return fetch(event.request)
            .catch(()=>caches.match('offline.html'))
        })
    )
} );


self.addEventListener('activate',(event)=>{
    const chacheWhitelist = [];
    chacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames)=> Promise.all(
            cacheNames.map((cacheName)=>{
                if(!chacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName)
                }
            })
        ))
    )
} );

// LIsten for the request 
//Activte the CW
