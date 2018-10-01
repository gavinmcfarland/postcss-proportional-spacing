import postcss from 'postcss';

// Regexes
const NUMBER = /^[+-]?\d*\.?\d*$/g;

export const object = {
	padding: {
		top: null,
		right: null,
		bottom: null,
		left: null
	},
	margin: {
		top: null,
		right: null,
		bottom: null,
		left: null
	},
	hasNumber: false
}

export function getProperties(rule, property) {

	// Check if properties in rule contain a unitless number
	rule.walkDecls(/padding|margin/, decl => {
		const words = postcss.list.space(decl.value)
		for (let a = 0; a < words.length; a++) {
			if (words[a].match(NUMBER)) {
				object.hasNumber = true;
			}
		}
	});

	var regex1 = new RegExp("^" + property);
	// If true avoid going through properties for no reason
	if (object.hasNumber) {
		// For each property which matches property
		rule.walkDecls(decl => {
			var regex2 = new RegExp("^" + property + "$");
			var regex3 = new RegExp("^" + property + "-");

			// Create sub properties as as strings from object
			let sides = Object.keys(object[property]);

			// For shorthand properties
			if (decl.prop.match(regex2)) {
				// Populate values from shorthand notation
				let values = postcss.list.space(decl.value);

				switch(values.length) {
					case 1:
						values.push(values[0]);
						// falls through
					case 2:
						values.push(values[0]);
						// falls through
					case 3:
						values.push(values[1]);
				}

				// For each side record value in object
				for (let a = 0; a < sides.length; a++) {
					let side = sides[a];
					object[property][side] = values[a];
				}

				// console.log(values);
				// console.log(object.padding);
			}

			// / For sub properties
			if (decl.prop.match(regex3)) {

				for (let a = 0; a < sides.length; a++) {
					let side = sides[a];

					// Check to see if are in rule
					if (decl.prop === property + "-" + side) {
						// Record value
						object[property][side] = decl.value;
					}
				}
				// console.log(object.padding);
			}

		});
	}

	return object[property];
}
