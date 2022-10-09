# Recursive Art
Don't forget to create issues as needed: [Bug Report](https://github.com/CS-at-GA/APCSP-03-RecursiveArt/issues/new?assignees=gajoswald&labels=bug&template=bug_report.md&title=) | [Help Request](https://github.com/CS-at-GA/APCSP-03-RecursiveArt/issues/new?assignees=gajoswald&labels=help+wanted&template=help-request.md&title=Help+Request) | [Request for Clarity](https://github.com/CS-at-GA/APCSP-03-RecursiveArt/issues/new?assignees=gajoswald&labels=documentation&template=request-for-clarity.md&title=Request+for+Clarity)

## Pre-reads

Nature of Code, [Chapter 8](https://natureofcode.com/book/chapter-8-fractals/)

## Starter Code Overview

The code here uses the [p5 Key Binding Pattern](https://gist.github.com/gajoswald/a7bd7558b7e2c9b860b78d2fedfebea1) (twice) to manage the key presses. As well as an object to store color information, and a couple of functions to manage those pieces.

### `filter`, and functional programming
  One particularly noteworthy piece is this line: 

```javascript
colors.defaultBG = color(random(colorList.filter( c => c != colors.defaultStroke || c != colors.defaultFill )))
```

making use of the `filter` function. `filter` is one of JavaScript's _higher order functions_, which are noteworthy for their ability to create terse code. 

The pattern these functions use is that they work on lists[^1]. The parameter to the function is another function. This function could be defined elsewhere, but often is defined _anonymously_ at the point of the call, as is the case here. `c => c != colors.defaultStroke || c != colors.defaultFill` is a function call. It could be rewritten like this

```javascript
function isNotAlreadyUsedColor(c) {
  return c != colors.defaultStroke || c != colors.defaultFill
}
```

For `filter`, if whatever the function returns is true, the current value is added to a new list. When all of the values have been tested, the new list is returned. A ramification of this is that the original list is unmodified, which is a staple of traditional, functional programming.

### One other peculiarity

There's a variabe here called, `currentDrawingFunction` and it is intialized the following symbol salad: `() => {}`. This, again, is a function. This whole line, really, is a function declaration, but what distinguishes it is that we are going to change what this function does later. You can see that I call this function in `draw`. Unsurprisingly, when I run the sketch, nothing appears. You can see in the key binding code that I end up assinging the value of the relevant function to `currentDrawingFunction`. 

### The Three Recursive Functions

I've provided a few baseline examples from [_The Nature of Code_](https://natureofcode.com/book) here and bound them to key presses. The circles and Cantor examples are a pretty straight translation from Processing (Java) to p5 (JavaScript)[^2]. The Koch Curve example is far removed from the Java code. 

The basic idea is the same, however. A "Koch Line" has a starting and ending point. Those points are represented by the mathematical concept of vectors, and in both examples, we use built in functionality for representing  (`PVector` in the Processing example, and [`p5.Vector`](https://p5js.org/reference/#/p5.Vector) here). On each (recursive) generation, we take one line, break it up into five points, and use those five points to create four new Koch Lines. Those new lines go into a list of all the new lines, and eventually, we replace the previous lines with the new ones. 

### Two Final Quirks

####  `noise`

I've commented out two lines in each of the first two examples. The lines both deal with the variable `tShrinkFactor`. If you uncomment these lines (and comment out the related, exisiting line), you can see some variablitity in how these drawings are represented. Especially if...

#### `isLooping`

There is this line in `utilBindings`:

```javascript
  "a": () => isLooping() ? noLoop() : loop(),
```
Which basically means that when we press the 'a' key, that we check to see if we are looping, and then do the opposite. Effectively starting and stopping animation.

Combine these two quirks for the wow factor

## Assignment 

Create a unique, manipulatable, and asthetically pleasing recursive drawing. 

### Requirements

* Your project must respond to user input, including
  * a way to advance the recursion
  * a way to reset the recursion
* Your project must use color

### _Some_ Ideas for Ways to Expand on This Project. 

* Any of the examples found in Chapter 8, including L-Systems.
* The [Mandlebrot Set](https://en.wikipedia.org/wiki/Mandelbrot_set)
* Anything called [Sierpiński's](https://en.wikipedia.org/wiki/Wac%C5%82aw_Sierpi%C5%84ski)

<!--- Footnotes Below --->
[^1]: And other collections... 
[^2]: The primary difference in these examples are related to the fact that Java is a _typed_ language, meaning that you have to declare a variable's type. In JavaScript, a declaration using `let`, for instance, can hold any type and even multiple types over the lifespan of the variable. 