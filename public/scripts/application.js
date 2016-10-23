$(document).ready(function () {
    var dog = new Dog({
        render: function (dog) {
            var $dog = $('#dog');

            switch (dog.state) {
                case Dog.SLEEPING:
                    $dog.html('[sleeping]');
                    break;
                case Dog.EATING:
                    $dog.html('[eating]');
                    break;
                case Dog.PLAYING:
                    $dog.html('[playing]');
                    break;
                case Dog.POOPED:
                    $dog.html('[pooped]');
                    break;
                default:
                    $dog.attr('src', '/images/sitting.gif');
            }
        },
        onSit: function (dog, just_pooped) {
            if (!just_pooped && Math.random() <= 0.4) {
                dog.pooped();
                $('#message').text('Pomo left you a present');
            } else {
                $('#message').text('Play time!');
            }
        }
    });

    var timer = new Timer({
        onStartWork: function (timer) {
            $('#start-work').addClass('active');
            $('#start-break').removeClass('active');

            $('#message').text('Get back to work!');

            $('#dog-buttons').addClass('disabled');
            dog.sleep();
        },
        onStartBreak: function (timer) {
            $('#start-break').addClass('active');
            $('#start-work').removeClass('active');

            $('#dog-buttons').removeClass('disabled');
            dog.sit();
        },
        render: function (timer) {
            var minutes = Math.floor(timer.seconds / 60);
            var seconds = timer.seconds - (minutes * 60);
            $('#timer').html(minutes + ":" + (seconds < 10 ? '0' + seconds : seconds));
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
});
