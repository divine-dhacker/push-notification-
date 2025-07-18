const btn = document.getElementById('notifyBtn');

btn.addEventListener('click', () => {
    // Request permission
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            alert("✅ Notification Permission Granted!");

            // Auto notification after 5 seconds
            setTimeout(() => {
                new Notification("🎉 Site Updated!", {
                    body: "Check out the new features on the site!",
                    icon: "https://cdn-icons-png.flaticon.com/512/5610/5610944.png"
                });
            }, 5000); // 5 seconds delay

        } else {
            alert("❌ You blocked notifications.");
        }
    });
});
