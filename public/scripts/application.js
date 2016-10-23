$(document).ready(function () {
    var dog = new Dog({
        render: function (dog) {
            var $dog = $('#dog');

            switch (dog.state) {
                case Dog.SLEEPING:
                    $dog.attr('src', '/images/sleeping.gif');
                    $('#message').text('Come back later');
                    break;
                case Dog.EATING:
                    $dog.attr('src', '/images/eating.gif');
                    $('#message').text('Nom nom nom');
                    break;
                case Dog.PLAYING:
                    $dog.attr('src', '/images/play.gif');
                    $('#message').text('Play time!');
                    break;
                case Dog.POOPED:
                    $dog.attr('src', '/images/poop.gif');
                    $('#message').text('Pomo left you a present');
                    break;
                default:
                    $dog.attr('src', '/images/sitting.gif');
                    $('#message').text('Good job');
            }
        },
        onSit: function (dog, just_pooped) {
            if (!just_pooped && Math.random() <= 0.4) {
                dog.pooped();
            }
            if (just_pooped) {
                $('#message').text('All clean!');
            }
        }
    });

    var timer = new Timer({
        onStartWork: function (timer, will_notify) {
            $('#start-work').addClass('active');
            $('#start-break').removeClass('active');

            $('#dog-buttons').addClass('disabled');
            dog.sleep();
        },
        onStartBreak: function (timer, will_notify, message) {
            $('#start-break').addClass('active');
            $('#start-work').removeClass('active');
            
            $('#dog-buttons').removeClass('disabled');
            dog.sit();
            
            if (typeof message !== "undefined") {
                $('#message').text(message);
            } else if (!dog.hasPooped()) {
                $('#message').text('Time for a break!');
            }
            
            if (will_notify !== false) {
                Dog.SOUND_SIT.play();
                notify();
            }
        },
        render: function (timer) {
            var minutes = Math.floor(timer.seconds / 60);
            var seconds = timer.seconds - (minutes * 60);
            
            var $timer = $('#timer');
            $timer.html(minutes + ":" + (seconds < 10 ? '0' + seconds : seconds));
            
            if (!timer.is_working && seconds > 5 * 60) {
                $timer.css('color', '#c00');
            } else {
                $timer.css('color', '#333');
            }
        }
    });


    $('#start-work').click(function () {
        timer.startWork();
    });

    $('#start-break').click(function () {
        timer.startBreak();
    });

    // Dog buttons
    $('#dog-play').click(function () {
        dog.play();
    });

    $('#dog-feed').click(function () {
        dog.feed();
    });

    $('#dog-clean').click(function () {
        dog.clean();
    });
    
    
    $('#reset').click(function () {
        if (confirm('Empty local storage?')) {
            timer.emptyStorage();
        }
    });
});
