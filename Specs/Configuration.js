// Put this file in the parent directory of the runner folder. Also rename the file to Configuration.js

(function(context){

var Configuration = context.Configuration = {};

// Runner name
Configuration.name = 'Element.Style.Transform';


// Presets - combine the sets and the source to a preset to easily run a test
Configuration.presets = {
	
	'all': {
		sets: ['all'],
		source: ['mootools-core', 'all']
	}
	
};

// An object with default presets
Configuration.defaultPresets = {
	browser: 'all',
	jstd: 'all'
};


/*
 * An object with sets. Each item in the object should have an path key, 
 * that specifies where the spec files are and an array with all the files
 * without the .js extension relative to the given path
 */
Configuration.sets = {

	'all': {
		path: 'Element.Style.Transform/',
		files: ['Element.Style.Transform']
	}

};


/*
 * An object with the source files. Each item should have an path key,
 * that specifies where the source files are and an array with all the files
 * without the .js extension relative to the given path
 */
Configuration.source = {


	'mootools-core': {
		path: '../../mootools-core/Source/',
		files: [
			'Core/Core',
			
			'Slick/Slick.Parser',

			'Types/Array',
			'Types/Function',
			'Types/Number',
			'Types/String',
			'Types/Object',

			'Class/Class',
			'Class/Class.Extras',

			'Types/Event',

			'Browser/Browser',

			'Slick/Slick.Parser',
			'Slick/Slick.Finder',

			'Element/Element',
			'Element/Element.Event',
			'Element/Element.Style',
			'Element/Element.Dimensions',

			'Fx/Fx',
			'Fx/Fx.CSS',
			'Fx/Fx.Tween',
			'Fx/Fx.Morph',
			'Fx/Fx.Transitions',

		]
	},
	'all': {
		path: '../Source/',
		files: [
			'Element.Style.Transform',
			'Element.Style.Transform.Filter',
			'Fx.Transform'
		]
	}

};

})(typeof exports != 'undefined' ? exports : this);
