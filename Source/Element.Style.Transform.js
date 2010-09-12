/*
---
name: Element.Style.Transform
description: A simple API for the css transform styles
requires: [Core/Element.Style]
provides: Element.Style.Transform
...
*/

(function(global, doc, undef){

var testElement = doc.createElement('div'),
	PROPERTY = null,
	MS_FILTER = 'filter',
	TRANSFORMS_STORE_KEY = 'Element.Styles.Transforms:properties';


// Test for transform properties
var PROPERTIES = ['transformProperty', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];

for (var i = 0, l = PROPERTIES.length; i < l; i++){
	if (testElement.style[PROPERTIES[i]] !== undef) PROPERTY = PROPERTIES[i];
}


// test for IE filter
if (!PROPERTY && testElement.style.filter != undef) PROPERTY = MS_FILTER;


// Define custom functions for special properties or MS Filters
var TRANSFORMS = {},
	FILTER_TRANSFORMS = {};

var defines = Element.Transforms = {	
	// define custom transforms
	defineTransform: function(name, fn){
		if (Type.isFunction(fn)) TRANSFORMS[name] = fn;
	},

	// define functions that will be used to mimic transforms with MS filter
	defineFilter: function(name, fn){
		if (Type.isFunction(fn)) FILTER_TRANSFORMS[name] = fn;
	}.overloadSetter()
};

defines.defineTransforms = defines.defineTransform.overloadSetter();
defines.defineFilters = defines.defineFilter.overloadSetter();


// Parse the transform or filter strings
var parseTransforms = function(properties){
	var styles = [];
	for (var name in properties){
		if (name in TRANSFORMS) styles.push(TRANSFORMS[name].call(this, properties[name]));
		else styles.push(name + '(' + (Type.isArray(properties[name]) ? properties[name].join(', ') : properties[name]) + ')');
	}
	return styles.join(' ');
};

var parseFilter = function(properties){
	var styles = [];
	for (var name in properties){
		if (name in FILTER_TRANSFORMS) styles.push(FILTER_TRANSFORMS[name].call(this, properties[name]));
	}
	return styles.join(' ');
};

// Implement the element methods
var ELEMENT_METHODS = {

	setTransform: function(property, value){
		var properties = this.retrieve(TRANSFORMS_STORE_KEY, {});
		properties[property] = value;

		this.style[PROPERTY] = (PROPERTY == MS_FILTER) ? parseFilter.call(this, properties) : parseTransforms.call(this, properties);
		this.store(TRANSFORMS_STORE_KEY, properties);
		return this;
	},

	getTransform: function(property){
		var properties = this.retrieve(TRANSFORMS_STORE_KEY, {});
		return properties[property] || Element.Transforms.defaults[property];
	}

};

Element.implement(Object.append(ELEMENT_METHODS, {
	setTransforms: ELEMENT_METHODS.setTransform.overloadSetter(),
	getTransforms: ELEMENT_METHODS.getTransform.overloadGetter()
}));


// Implement special transform handling
Element.Transforms.defineTransforms({
	rotate: function(value){
		return 'rotate(' + parseFloat(value) + 'deg)';
	}
});

Element.Transforms.defaults = {
	rotate: 0,
	scale: 1
}

})(this, document);
