if (Notification && Notification.permission !== "granted") {
    Notification.requestPermission();
}


function notify () {
    if (!Notification) return;
    if (Notification.permission !== "granted") return;
    if (document.hasFocus()) return;
    
    var notification = new Notification('Pomogotchi', {
        icon: 'https://i.imgur.com/D71TTTi.png',
        body: "Time for a break!",
    });
    setTimeout(notification.close.bind(notification), 6000);
    notification.onclick = function () {
        window.focus();
    };
}