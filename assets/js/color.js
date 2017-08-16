function color(imgSrc, isDarkImg) {                                             // For given image source, returns eg rgb(20, 30, 40) with average color of image
  var img = document.createElement('img');                                      // Takes "isDarkImg"; if true it will return lighter value
  console.log(imgSrc)
  img.src = "/" + imgSrc;
  img.width = 1000;
  img.height = 1000;
  var rgb = getAverageRGB(img);
  return "rgb(" + Math.floor(convertRange(rgb.r, [0, 255], isDarkImg ? [80, 255] : [0, 200])) + ", " + Math.floor(convertRange(rgb.g, [0, 255], isDarkImg ? [80, 255] : [0, 200])) + ", " + Math.floor(convertRange(rgb.b, [0, 255], isDarkImg ? [80, 255] : [0, 200])) + ")"
}

function convertRange(value, r1, r2) {                                          // Takes a value within given range r1, eg 20 in [0, 100]
  return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];           // And returns that value scaled to r2, eg [0, 200] => 40
}

function getAverageRGB(imgEl) {                                                 // This function will return the average RGB of an html element
  var blockSize = 5, // only visit every 5 pixels
    defaultRGB = {
      r: 0,
      g: 0,
      b: 0
    }, // for non-supporting envs
    canvas = document.createElement('canvas'),
    context = canvas.getContext && canvas.getContext('2d'),
    data, width, height,
    i = -4,
    length,
    rgb = {
      r: 0,
      g: 0,
      b: 0
    },
    count = 0;
  if (!context) {
    console.log("Returning default")
    return defaultRGB;
  }

  height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    /* security error, img on diff domain */
    alert('x');
    console.log(e)
    return defaultRGB;
  }

  length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return rgb;

}
