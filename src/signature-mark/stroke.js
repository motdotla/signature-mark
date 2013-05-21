(function(SignatureMark){
  SignatureMark.prototype.drawStroke = function(self) {
    var i;
    for(i = 0; i < self.painters.length; i++) {
      self.context.beginPath();
      
      pntr = self.painters[i];
      self.context.moveTo(pntr.dx, pntr.dy);
      var dx1 = pntr.ax = (pntr.ax + (pntr.dx - self.mouseX) * pntr.div) * pntr.ease;
      pntr.dx -= dx1;
      var dx2 = pntr.dx;
      var dy1 = pntr.ay = (pntr.ay + (pntr.dy - self.mouseY) * pntr.div) * pntr.ease;
      pntr.dy -= dy1;
      var dy2 = pntr.dy;
      self.context.lineTo(dx2, dy2);
      self.context.stroke();
    }
  };

  SignatureMark.prototype.startDrawingStroke = function(self) {
    var interval = setInterval(function() { self.drawStroke(self); }, self.refresh_rate);
    self.strokeIntervals.push(interval);
  };

  SignatureMark.prototype.stopDrawingStroke = function(self) {
    for(var i = 0; i < self.strokeIntervals.length; i++) {
      clearInterval(self.strokeIntervals[i]);
    }
  };
}(SignatureMark));