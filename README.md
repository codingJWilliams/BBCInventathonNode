# Fruit punch :punch:!
### Contributors
* Lead Developer: `Jay Williams`
* Junior Developers: `Nikash Chekuri` <img src="https://snusercontent.global.ssl.fastly.net/member-profile-full/44/4288444_8862847.jpg" width="50"> , `Gokul Menon`
* Tester: `Shaquille`
* Alternative Developer: `Rory Sharp` [Solution in Python](https://github.com/codingJWilliams/BBCInventathon)
### What is this?
This is a program designed to train your brain.
An image appears of a crate of a certain type of fruit, for example limes, and you have to look for the camouflaged word and hit that fruit.
![Demo](https://jaywilliams.me/static/screencapture-localhost-4000-1502989254235.png)
### How do I set it up?
First, set up a [Makey Makey](makeymakey.com) device and [remap](http://makeymakey.com/remap) the arrow keys to 1, 2, 3, and 4. Then, clone this repo to a folder and navigate there in a command prompt.
Type `npm install` into the prompt and wait for all of the dependencies to install. Then open `html/game.html` with your favorite text editor and look for the section that begins:

```javascript
var fruits = [
  {
    name: "Lemon",
    pics: ["url('lemon1.jpg')", "url('lemon2.jpg')", "url('lemon3.jpg')", "url('lemon4.jpg')"],
    key: "Digit2"
  },
```

Connect a wire from each arrow key to a fruit and then connect yourself to the ground. Open word or any text input and test which key each fruit is connected to. Then, where it says `key:  "Digit2"` and replace it with the correct digit for each fruit you have connected.
Then, in your command line window, type "node index" and open "localhost:4000" with your favorite browser
