var Timer = function (args) {
    if (args.onStartWork) this.onStartWork = args.onStartWork;
    if (args.onStartBreak) this.onStartBreak = args.onStartBreak;
    if (args.render) this.render = args.render;
    
    this.seconds = 0;
    this.is_working = false;
    
    this.store = true;
    
    // Try to load the saved timer
    if (localStorage && localStorage.getItem('timer')) {
        var t = JSON.parse(localStorage.getItem('timer'));
        this.seconds = t.seconds;
        this.is_working = t.is_working;
        
        if (this.is_working) {
            this.onStartWork(this, false);
        } else {
            this.onStartBreak(this, false);
        }
    } else {
        this.onStartBreak(this, false, 'You should start some work');
    }
    
    this.interval = setInterval(function () {
        if (this.is_working) {
            if (this.seconds > 0) {
                this.seconds--;
            }
            
            if (this.seconds == 0) {
                this.startBreak(this);
            }
        } else {
            this.seconds++;
        }
        
        if (localStorage && this.store) {
            var t = { seconds: this.seconds, is_working: this.is_working };
            localStorage.setItem('timer', JSON.stringify(t));
        }
        
        this.render(this);
    }.bind(this), 1000);
    
    this.render(this);
};


Timer.prototype.startWork = function () {
    this.seconds = window.config.WORK_SECONDS;
    this.is_working = true;
    this.render(this);
    this.onStartWork(this);
};


Timer.prototype.startBreak = function () {
    this.seconds = 0;
    this.is_working = false;
    this.render(this);
    this.onStartBreak(this);
};


Timer.prototype.emptyStorage = function () {
    this.store = false;
    if (localStorage) {
        localStorage.removeItem('timer');
    }
}


Timer.prototype.onStartWork = function () {};
Timer.prototype.onStartBreak = function () {};
Timer.prototype.render = function () {};