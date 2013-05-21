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