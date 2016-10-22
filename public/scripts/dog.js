var Dog = function () {
    this.state = Dog.NORMAL;
}


Dog.NORMAL = 0;
Dog.SLEEPING = 1;
Dog.PATTING = 2;


Dog.prototype.sleep = function () {
    this.state = Dog.SLEEPING;
    
    this.onSleep();
};


Dog.prototype.wakeUp = function () {
    this.state = Dog.NORMAL;
    
    this.onWakeUp();
};


Dog.prototype.pat = function () {
    this.state = Dog.PATTING;
    
    this.onPat();
};


Dog.prototype.onSleep = function () {};
Dog.prototype.onWakeUp = function () {};
Dog.prototype.onPat = function () {};