var Timer = function (args) {
    this.seconds = 0;
    this.is_running = false;
    
    timer = this;
    
    this.interval = setInterval(function () {
        if (!timer.is_running) return;
        
        if (timer.seconds > 0) {
            timer.seconds--;
        }
        
        timer.onUpdate(timer.seconds);
        
        if (timer.seconds == 0) {
            timer.stop();
            timer.onZero();
        }
    }, 1000);
    
    if (args.onZero) timer.onZero = args.onZero;
    if (args.onUpdate) timer.onUpdate = args.onUpdate;
};


Timer.prototype.start = function (seconds) {
    if (typeof seconds !== "undefined") {
        this.seconds = seconds;
    }
    
    this.is_running = true;
};


Timer.prototype.stop = function () {
    this.is_running = false;
};


Timer.prototype.onZero = function () {};
Timer.prototype.onUpdate = function () {};