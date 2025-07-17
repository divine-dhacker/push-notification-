document.addEventListener('DOMContentLoaded', () => {
    // Get a reference to our button
    const notifyButton = document.getElementById('notifyButton');

    // Add an event listener to the button
    notifyButton.addEventListener('click', () => {
        // Step 1: Check if the browser supports notifications
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notifications.');
            return;
        }

        // Step 2: Request permission from the user
        // The Notification.requestPermission() method returns a Promise
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                // Step 3: If permission is granted, display the notification
                displayNotification();
            } else if (permission === 'denied') {
                console.warn('Notification permission denied.');
                alert('You denied notification permission. We cannot show notifications.');
            } else { // 'default'
                console.log('Notification permission dismissed (default).');
                alert('You dismissed the notification permission request.');
            }
        }).catch(error => {
            console.error('Error requesting notification permission:', error);
        });
    });

    // Function to display the notification
    function displayNotification() {
        // Options for the notification
        const options = {
            body: 'You just received an awesome notification from our demo!', // Main text content
            icon: 'https://cdn-icons-png.flaticon.com/512/1154/1154560.png', // A small icon (replace with your own)
            image: 'https://picsum.photos/300/200', // Larger image for the notification (optional)
            vibrate: [200, 100, 200], // Vibration pattern for mobile
            badge: 'https://cdn-icons-png.flaticon.com/512/1154/1154560.png', // Small badge icon
            tag: 'awesome-notification', // A tag to prevent duplicate notifications
            renotify: true, // Show notification again even if tag is the same
            requireInteraction: true, // Keep notification open until user interacts
            data: {
                url: 'https://www.google.com' // Custom data to associate with the notification
            }
        };

        // Create and show the notification
        // The first argument is the title of the notification
        const notification = new Notification('Awesome Notification!', options);

        // Optional: Add event listeners to the notification
        notification.addEventListener('click', () => {
            console.log('Notification clicked!');
            // Example: Open a URL when the notification is clicked
            if (notification.data && notification.data.url) {
                window.open(notification.data.url, '_blank');
            }
            notification.close(); // Close the notification after click
        });

        notification.addEventListener('close', () => {
            console.log('Notification closed!');
        });

        notification.addEventListener('error', (event) => {
            console.error('Notification error:', event);
        });
    }

    // --- Service Worker Registration (Crucial for real push notifications) ---
    // This part is vital for making "real" push notifications that can be sent
    // even when the user is not actively on your page.
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        });
    }
});
