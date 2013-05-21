(function(SignatureMark){
  SignatureMark.prototype.initEvents = function() {
    var self = this;
    self.canvas.addEventListener(self.mouse_down, function(e)     { self.onCanvasMouseDown(self, e); }, false);
    self.canvas.addEventListener(self.mouse_move, function(e)     { self.onCanvasMouseMove(self, e); }, false);
    self.canvas.addEventListener('contextmenu', function(e)       { self.preventRightClick(self, e); }, false);

    document.addEventListener(self.mouse_up, function(e)          { self.onCanvasMouseUp(self, e); }, false);
    self.canvas.addEventListener(self.mouse_up, function(e)       { self.onCanvasMouseUp(self, e); }, false);  
  };

  SignatureMark.prototype.preventRightClick = function(self, e) {
    e.preventDefault();
  };

  SignatureMark.prototype.onCanvasMouseDown = function(self, e) {
    e.preventDefault();
    self.setCanvasOffset(self);
    self.startDrawingStroke(self);
    self.setMouseXAndMouseY(self, e);
    self.setPainters(self);
  };

  SignatureMark.prototype.onCanvasMouseMove = function(self, e) {
    e.preventDefault();
    self.setMouseXAndMouseY(self, e);
  };

  SignatureMark.prototype.onCanvasMouseUp = function(self, e) {
    self.stopDrawingStroke(self);
  };

  SignatureMark.prototype.setMouseXAndMouseY = function(self, event) {
    if (!!self.touch_supported) {
      target                 = event.touches[0];
      self.mouseX            = target.pageX - self.canvasOffsetLeft;
      self.mouseY            = target.pageY - self.canvasOffsetTop;
    } else {
      self.mouseX            = event.pageX - self.canvasOffsetLeft;
      self.mouseY            = event.pageY - self.canvasOffsetTop;
    }
  };

  SignatureMark.prototype.setCanvasOffset = function(self) {
    canvasOffset              = self.Offset(self.canvas);
    self.canvasOffsetLeft     = canvasOffset.left;
    self.canvasOffsetTop      = canvasOffset.top;
  };
}(SignatureMark));