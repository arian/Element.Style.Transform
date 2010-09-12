Element.Style.Transform
=======================

Brings a simple cross browser API for CSS3 transforms. It will use the CSS transform property if it exists, or the MS filter property.

Usage
=====

Each method or function has a plural function that accepts an object with key/value pairs. For example `setTransform` becomse `setTransforms`.

Element method: setTransform
----------------------------

Transform an element.

	myElement.setTransform(property, value);

### Arguments

1. property - (*string*) Transform Property, e.g. rotate or scale
2. value - (*mixed*) The value

### Returns

- The Element Instance

### Example

	myElement.setTransform('rotate', 30); // myElement will rotate 30 degrees


Element method: getTransform
----------------------------

Get the value of a transform.

	myElement.getTransform(property)

### Argument

1. property - (*string*) Transform Property, e.g. rotate or scale

### Returns

- The value which is set by the setTransform method, a default value from `Element.Transform.defaults` or `null`


Function Element.Transforms.defineTransform
-------------------------------------------

Define a custom function for special transforms

	Element.Transforms.defineTransform(property, fn);

### Arguments

1. property - (*string*) Transform Property, e.g. rotate or scale
2. fn - (*function*) A function that returns a string that will be set in the css transform property.

### Signature

	fn (value)

Function Element.Transforms.defineFilter
----------------------------------------

Define a custom function for IE filter transforms. Because it is only possible to mimic CSS3 Transforms in IE, there 
should be a custom function that mimics the transform behaviour in IE.

	Element.Transforms.defineFilter(property, fn);

### Arguments

1. property - (*string*) Transform Property, e.g. rotate or scale
2. fn - (*function*) A function that returns a string that will be set in the filter property.

### Signature

	fn (value)


