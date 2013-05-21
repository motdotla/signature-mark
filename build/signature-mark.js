/*! signature-mark.js - 0.0.1 - 2013-05-21 - scottmotte */
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

(function(SignatureMark){
  SignatureMark.prototype.Offset = function(element) {
    if (element === undefined) return null;
    var obj = element.getBoundingClientRect();
    return {
      left: obj.left + window.pageXOffset,
      top: obj.top + window.pageYOffset
    };
  };
}(SignatureMark));

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

(function(SignatureMark){
  SignatureMark.prototype.initVariables = function() {
    this.touch_supported      = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) ? true : false;
    this.context              = this.canvas.getContext('2d');
    this.color                = [0, 0, 0];
    this.brush_pressure       = 0.5;
    this.context.strokeStyle  = "rgba(" + this.color[0] + ", " + this.color[1] + ", " + this.color[2] + ", " + this.brush_pressure + ")";
    this.context.lineWidth    = 2.5; // brush size
    this.painters             = [];
    this.mouseX               = 0;
    this.mouseY               = 0;
    this.strokeIntervals      = [];
    this.refresh_rate         = 5;
    this.max_strokes          = 12;
    this.easing               = 0.7;
    this.mouse_down           = "mousedown";
    this.mouse_move           = "mousemove";
    this.mouse_up             = "mouseup";

    if (!!this.touch_supported) {
      this.mouse_down         = "touchstart";
      this.mouse_move         = "touchmove";
      this.mouse_up           = "touchend";
    } else {
      this.refresh_rate       = 10;
      this.max_strokes        = 100;
    }
  };

}(SignatureMark));