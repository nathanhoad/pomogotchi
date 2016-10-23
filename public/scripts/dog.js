var Dog = function (args) {
    if (args.render) this.render = args.render;
    if (args.onSit) this.onSit = args.onSit;
    
    this.sit(true);
}


Dog.SITTING = 0;
Dog.SLEEPING = 1;
Dog.PLAYING = 2;
Dog.EATING = 3;
Dog.POOPED = 4;

Dog.SOUND_POOP = new Howl({ src: ['/sounds/sad.wav'] });
Dog.SOUND_PLAY = new Howl({ src: ['/sounds/play.wav'] });
Dog.SOUND_EAT = new Howl({ src: ['/sounds/eat.wav'] });
Dog.SOUND_SIT = new Howl({ src: ['/sounds/sit.wav' ]});
Dog.SOUND_CLEAN = new Howl({ src: ['/sounds/clean.wav' ]});


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
    Dog.SOUND_POOP.play();
};


Dog.prototype.clean = function () {
    if (this.state == Dog.POOPED) {
        this.sit(true);
        Dog.SOUND_CLEAN.play();
    }
};


Dog.prototype.sleep = function () {
    this.setState(Dog.SLEEPING);
};


Dog.prototype.play = function () {
    if (!this.isSitting()) return;
    
    this.setState(Dog.PLAYING);
    Dog.SOUND_PLAY.play();
    
    setTimeout(function () {
        this.sit();
    }.bind(this), 1500 + (Math.random() * 2000));
}


Dog.prototype.feed = function () {
    if (!this.isSitting()) return;
    
    this.setState(Dog.EATING);
    Dog.SOUND_EAT.play();
    
    setTimeout(function () {
        this.sit();
    }.bind(this), 1500 + (Math.random() * 2000));
};


Dog.prototype.render = function () {};
Dog.prototype.onSit = function () {};