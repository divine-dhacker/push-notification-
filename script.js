const notifyBtn = document.getElementById('notifyBtn');

// Step 1: When you click the button
notifyBtn.addEventListener('click', () => {

    // Step 2: Check if browser supports Notification API
    if (!("Notification" in window)) {
        alert("Your browser does not support desktop notification!");
        return;
    }

    // Step 3: Check permission and ask if not granted
    if (Notification.permission === "granted") {
        sendNotification();
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                sendNotification();
            } else {
                alert("You blocked notifications!");
            }
        });
    } else {
        alert("You have blocked notifications. Please enable it in your browser settings.");
    }
});

// Step 4: Function to send the notification
function sendNotification() {
    const notification = new Notification("✅ Success Notification", {
        body: "This is your custom push notification!",
        icon: "https://cdn-icons-png.flaticon.com/512/5610/5610944.png" // any icon link
    });

    // Optional: when you click the notification
    notification.onclick = () => {
        window.focus();
    };
}
