if (typeof Notification !== "undefined" && Notification.permission !== "granted") {
    Notification.requestPermission();
}


function notify () {
    if (typeof Notification == "undefined") return;
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