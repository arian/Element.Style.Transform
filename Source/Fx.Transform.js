/*
---
name: Fx.Transform
description: Tween CSS Transforms
requires: [Element.Style.Transform, Element.Style.Transform.Filter]
provides: Fx.Transform
...
*/


Fx.Transform = new Class({
	
	Extends: Fx.Tween,

	prepare: function(element, property, values){
		values = Array.from(values);
		if (values[1] == null){
			values[1] = values[0];
			values[0] = element.getTransform(property);
		}
		values = values.map(this.parse);
		return {from: values[0], to: values[1]};
	},

	compute: function(from, to, delta){
		return (to - from) * delta + from;
	},

	parse: function(value){
		return parseFloat(value);
	},
	
	render: function(element, property, value){
		element.setTransform(property, value);
	}

});
