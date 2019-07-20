# CssAnimations
A very simple and easy to use css animation library 

<h1> Making functions </h1>
  There are 4 default css functions: bounceDownUp, fadeIn, fadeOut, slideDownToMiddle.

But here is where the good part start kicking in, you can easily make your own functions.

**Example**
```js
css.fadeIn = new cssFunction({
        setUp: ["display"], /*setUp is optional, here you can set whatever you need to whatever you need,
        in this example, I needed to set display to "block.
        setup and end need to be an array*/
        animate: "opacity", /*Animate is required, transform is gonna be changed every frame.
        Animate only takes one parameter since I don't think you'll ever need to animate more than one thing */
        end: ["display"] /*you can set values after the animation is over. For example,
        in a fadeOut function you wil need to set display to none after */
    }, {
        setUp: [() => 'block'], /* here you set the the values, you do that with callback functions */
        animate: (progress) => progress/300 /* progress is how many frames have passed since the start */
        end: [() => 'block'] /*every thing you decalre in the first object needs to be declared in here as well"
    },
    300 //here you set how long the animation lasts
);
```
<h1>Using the functions</h1>

You can use the function is a few ways, the parameters are: 1: element to change, or an array of elements.

**First some shortCuts to make things easier 
```js
const $ = (arg) => arg[0] == ("#" || ".") ? document.querySelector(arg) : document.querySelectorAll(arg);
```
**One element:**

```js

css.fadeIn.run($("#button1"));
```
**Array of elements:**
```js
css.fadeIn.run([$("#button1"), $("#button2")), $("#button3")]);
```

**A nodeList:**
```js
css.fadeIn.run($All("button"));
```

You can also have css animations fire right after the first animation is finished.

```js
css.fadeIn.run($All("button"), css.fadeOut, $("#button2));
```

**List of functions**
```js
css.fadeIn.run($All("button"), [css.fadeOut, $("#button2"), css.bounceDownUp, $All("canvas")]);
```

If you come across any bugs, please file an issue!
