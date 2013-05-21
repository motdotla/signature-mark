(function(exports){
  var SignatureMark = function(canvas) {
    if(!(this instanceof SignatureMark)){
      return new SignatureMark(canvas);
    }

    this.canvas = canvas;
    this.init();

    return this;
  };

  SignatureMark.prototype.init = function() {
    this.initVariables();
    this.initPainters();
    this.initEvents();
  };

  exports.SignatureMark = SignatureMark;

}(this));