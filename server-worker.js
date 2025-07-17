// service-worker.js

// This file is the "brain" for handling push messages and background tasks.

// Listen for the 'install' event
// This event is fired when the service worker is first installed.
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
    // You can cache static assets here using event.waitUntil()
    // For this demo, we're not doing heavy caching.
});

// Listen for the 'activate' event
// This event is fired when the service worker is activated and ready to handle fetches.
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    // Claim clients immediately to take control of existing pages
    event.waitUntil(self.clients.claim());
});

// Listen for the 'push' event
// This is the core event for receiving push messages from a server.
// For this client-side only demo, this event won't be triggered by clicking the button.
// It would be triggered by a message sent from a server using a push service (e.g., Web Push Protocol).
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push received!');

    // Check if there's data in the push message
    const data = event.data ? event.data.json() : {};

    const title = data.title || 'Default Push Notification';
    const options = {
        body: data.body || 'You have new content!',
        icon: data.icon || 'https://cdn-icons-png.flaticon.com/512/1154/1154560.png',
        image: data.image,
        vibrate: [200, 100, 200],
        badge: data.badge || 'https://cdn-icons-png.flaticon.com/512/1154/1154560.png',
        data: data.data || { url: 'https://www.google.com' } // Custom data
    };

    // Show the notification using event.waitUntil
    // This ensures the notification is shown even if the service worker goes idle.
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Listen for the 'notificationclick' event
// This event is fired when the user clicks on a notification displayed by the service worker.
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification clicked!');
    event.notification.close(); // Close the notification

    const urlToOpen = event.notification.data.url || 'https://www.google.com';

    event.waitUntil(
        clients.openWindow(urlToOpen).then(windowClient => {
            if (windowClient) {
                console.log('Window opened:', windowClient.url);
            }
        })
    );
});

// Listen for the 'notificationclose' event
// This event is fired when the user closes a notification.
self.addEventListener('notificationclose', (event) => {
    console.log('Service Worker: Notification closed!');
});
