var Dog = function (args) {
    if (args.render) this.render = args.render;
    if (args.onSit) this.onSit = args.onSit;
    
    this.sit();
}


Dog.SITTING = 0;
Dog.SLEEPING = 1;
Dog.PLAYING = 2;
Dog.EATING = 3;
Dog.POOPED = 4;


Dog.prototype.setState = function (state) {
    this.state = state;
    this.render(this);
}


Dog.prototype.sit = function (just_pooped) {
    this.setState(Dog.SITTING);
    
    // Don't poop right after cleaning
    this.onSit(this, just_pooped);
};

Dog.prototype.isSitting = function () {
    return (this.state == Dog.SITTING);
}


Dog.prototype.pooped = function () {
    this.setState(Dog.POOPED);
};


Dog.prototype.clean = function () {
    if (this.state == Dog.POOPED) {
        this.sit(true);
    }
};


Dog.prototype.sleep = function () {
    this.setState(Dog.SLEEPING);
};


Dog.prototype.play = function () {
    if (!this.isSitting()) return;
    
    this.setState(Dog.PLAYING);
    
    setTimeout(function () {
        this.sit();
    }.bind(this), 2000);
}


Dog.prototype.feed = function () {
    if (!this.isSitting()) return;
    
    this.setState(Dog.EATING);
    
    setTimeout(function () {
        this.sit();
    }.bind(this), 2000);
};


Dog.prototype.render = function () {};
Dog.prototype.onSit = function () {};