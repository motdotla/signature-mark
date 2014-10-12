# signature-mark

Draw on a canvas with a smooth signature. Try the <a href="http://codepen.io/motdotla/pen/tqLBo">demo</a>.

```javascript
SignatureMark(document.getElementById("some-canvas"));
```

<img src="https://raw.githubusercontent.com/motdotla/signature-mark/master/signature-mark.gif" alt="signature-mark" />

## Usage

```html
<script src='/path/to/signature-mark.js'></script>
<canvas id="some-canvas"></canvas>   
<script type="text/javascript"> 
  var some_canvas = document.getElementById("some-canvas");
  some_canvas.width  = 900;
  some_canvas.height = 500;

  SignatureMark(some_canvas);
</script>
```

## Development

Edit only files under `/src` directory. Then run the following to generate the `/build` directory.

```
npm install
grunt
``` 

Visit <http://localhost:3000> to test out your changes.
