(function(SignatureMark){  
  SignatureMark.prototype.initPainters = function() {
    this.painters = [];
    for(var i = 0; i < this.max_strokes; i++) {
      var ease = Math.random() * 0.05 + this.easing;
      this.painters.push({
        dx : 0,
        dy : 0,
        ax : 0,
        ay : 0,
        div : 0.1,
        ease : ease
      });
    }
  };

  SignatureMark.prototype.setPainters = function(self) {
    for(var i = 0; i < self.painters.length; i++) {
      pntr    = self.painters[i];
      pntr.dx = self.mouseX;
      pntr.dy = self.mouseY;
    }
  };
}(SignatureMark));