function getColor(imgSrc, isDarkImg, cb){                                       // Takes: an image url. Returns, eg: "rgb(103, 78, 21)"
  var img = document.createElement("img");
  img.src = imgSrc;
  img.onload = function() {
    console.log("Loaded")
    var rgb = getAverageColor(img);
    cb("rgb(" + Math.floor(convertRange(rgb.r, [ 0, 255 ], isDarkImg ? [0, 255] : [ 0, 200 ] )) + ", " + Math.floor(convertRange(rgb.g, [ 0, 255 ], isDarkImg ? [0, 255] : [ 0, 200 ] )) + ", " + Math.floor(convertRange(rgb.b, [ 0, 255 ], isDarkImg ? [0, 255] : [ 0, 200 ] )) + ")");
  }
}
function convertRange( value, r1, r2 ) {                                        // Scales a value to a range
  return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}
function getAverageColor(img) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var width = canvas.width = img.naturalWidth;
  var height = canvas.height = img.naturalHeight;

  ctx.drawImage(img, 0, 0);

  var imageData = ctx.getImageData(0, 0, width, height);
  var data = imageData.data;
  var r = 0;
  var g = 0;
  var b = 0;

  for (var i = 0, l = data.length; i < l; i += 4) {
    r += data[i];
    g += data[i+1];
    b += data[i+2];
  }

  r = Math.floor(r / (data.length / 4));
  g = Math.floor(g / (data.length / 4));
  b = Math.floor(b / (data.length / 4));

  return { r: r, g: g, b: b };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h, s: s, l: l };
}
