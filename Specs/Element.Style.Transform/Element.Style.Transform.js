
var testElement = new Element('div', {
	styles: {
		width: 100,
		height: 100,
		background: 'red',
		margin: 100
	}
});

describe('Element.Style.Transform', function(){

	it('should rotate the element with 45 degrees', function(){
		testElement.inject(document.body);

		testElement.setTransform('rotate', 40);
	});
	
	
});
