/*
---
name: Element.Style.Transform
description: A simple API for the css transform styles
requires: [Core/Element.Style]
provides: Element.Style.Transform
...
*/

(function(){

var testElement = document.createElement('div'),
	transformProperty = null,
	msFilter = 'filter',
	transformStoreKey = 'Element.Styles.Transforms:properties';


// Test for transform properties
var properties = ['transformProperty', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];

for (var i = 0, l = properties.length; i < l; i++){
	if (testElement.style[properties[i]] != null) transformProperty = properties[i];
}


// test for IE filter
if (!transformProperty && testElement.style.filter != null) transformProperty = msFilter;


// Define custom functions for special properties or MS Filters
var transforms = {},
	filterTransforms = {};

var defines = Element.Transforms = {	
	// define custom transforms
	defineTransform: function(name, fn){
		if (Type.isFunction(fn)) transforms[name] = fn;
	},

	// define functions that will be used to mimic transforms with MS filter
	defineFilter: function(name, fn){
		if (Type.isFunction(fn)) filterTransforms[name] = fn;
	}
};

defines.defineTransforms = defines.defineTransform.overloadSetter();
defines.defineFilters = defines.defineFilter.overloadSetter();


// Parse the transform or filter strings
var parseTransforms = function(properties){
	var styles = [];
	for (var name in properties){
		if (name in transforms) styles.push(transforms[name].call(this, properties[name]));
		else styles.push(name + '(' + (Type.isArray(properties[name]) ? properties[name].join(', ') : properties[name]) + ')');
	}
	return styles.join(' ');
};

var parseFilter = function(properties){
	var styles = [];
	for (var name in properties){
		if (name in filterTransforms) styles.push(filterTransforms[name].call(this, properties[name]));
	}
	return styles.join(' ');
};

// Implement the element methods
var elementMethods = {

	setTransform: function(property, value){
		var properties = this.retrieve(transformStoreKey, {});
		properties[property] = value;

		this.style[transformProperty] = (transformProperty == msFilter) ? parseFilter.call(this, properties) : parseTransforms.call(this, properties);
		this.store(transformStoreKey, properties);
		return this;
	},

	getTransform: function(property){
		var properties = this.retrieve(transformStoreKey, {});
		return properties[transformProperty] || Element.Transforms.defaults[property];
	}

};

Element.implement(Object.append(elementMethods, {
	setTransforms: elementMethods.setTransform.overloadSetter(),
	getTransforms: elementMethods.getTransform.overloadGetter()
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
};


// Overwrite setStyle/getStyle for Fx.Tween and Fx.Morph
var setStyle = Element.prototype.setStyle;
Element.prototype.setStyle = function(property, value){
	if (property.substr(0, 10) == 'transform-') return this.setTransform(property.substr(10), value);
	return setStyle.call(this, property, value);
};

var getStyle = Element.prototype.getStyle;
Element.prototype.getStyle = function(property){
	if (property.substr(0, 10) == 'transform-') return this.getTransform(property.substr(10));
	return getStyle.call(this, property);
};


})();
