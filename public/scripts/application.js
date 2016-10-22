$(document).ready(function () {
    var dog = new Dog();

    var timer = new Timer({
        onZero: function () {
            console.log('test');
        },
        onUpdate: function (seconds) {
            var minutes = Math.floor(seconds / 60);
            seconds -= (minutes * 60);
            $('#timer').html(minutes + ":" + seconds);
        }
    });
    
    
    $('#start-timer').click(function () {
        timer.start(25 * 60);
    });
    
    $('#pause-timer').click(function () {
        timer.stop();
    });
    
    $('#pat-dog').click(function () {
        dog.pat();
    });
});