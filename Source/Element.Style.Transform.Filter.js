/*
---
name: Element.Style.Transform.Filter
description: Mimics CSS3 Transforms in IE
requires: [Element.Style.Transform]
provides: Element.Style.Transform.Filter
...
*/


Element.Transform.defineFilters({

	rotate: function(value){
		value = parseFloat(value) % 90;
		if (value < 0) value += 90;

		var rad = value * Math.PI / 180,
			costheta = Math.cos(rad),
			sintheta = Math.sin(rad),
			
			M11 = parseFloat(costheta).toFixed(8),
			M12 = parseFloat(-sintheta).toFixed(8),
			M21 = parseFloat(sintheta).toFixed(8),
			M22 = parseFloat(costheta).toFixed(8);

		return "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=" + M11 + ', M12=' + M12 + ', M21=' + M21 + ', M22=' + M22 + ')';
	},
	
	matrix: function(value){
		var l = 4;
		while (l--) (value[l] == null) ? value[l] = 0 : value[l];
		return "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=" + value[0] + ', M12=' + value[1] + ', M21=' + value[2] + ', M22=' + value[3] + ')';
	}
	/* @todo,

	scale: function(value){
		
	}
*/
});
