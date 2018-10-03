import postcss from 'postcss';

// Regexes
const NUMBER = /^[+-]?\d*\.?\d*$/g;
const QUANTITY = /(?<number>[+-]?\d*\.?\d)(?<unit>\w+)?/

// export const object = {
// 	padding: {
// 		top: null,
// 		right: null,
// 		bottom: null,
// 		left: null
// 	},
// 	margin: {
// 		top: null,
// 		right: null,
// 		bottom: null,
// 		left: null
// 	},
// 	hasNumber: false
// }

export const object = {
	padding: {
		top: {
			raw: {
				original: null,
				number: 0,
				unit: "",
				ratio: false
			},
			value: null
		},
		right: {
			raw: {
				original: null,
				number: 0,
				ratio: false
			},
			value: null
		},
		bottom: {
			raw: {
				original: null,
				number: 0,
				unit: "",
				ratio: false
			},
			value: null
		},
		left: {
			raw: {
				original: null,
				number: 0,
				unit: "",
				ratio: false
			},
			value: null
		}
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
					if (values[a].match(NUMBER)) {
						object[property][side].raw.ratio = true;
					}
					object[property][side].raw.original = values[a].match(QUANTITY)[0];
					object[property][side].raw.number = Number(values[a].match(QUANTITY)[1]);
					if (values[a].match(QUANTITY)[2]) {
						object[property][side].raw.unit = values[a].match(QUANTITY)[2];
					}
				}

				// console.log(values);
				// console.log(object.padding);
				// decl.remove();
			}

			// / For sub properties
			if (decl.prop.match(regex3)) {

				for (let a = 0; a < sides.length; a++) {
					let side = sides[a];

					// Check to see if are in rule
					if (decl.prop === property + "-" + side) {
						if (values[a].match(NUMBER)) {
							object[property][side].raw.ratio = true;
						}
						if (values[a].match(QUANTITY)[2]) {
							object[property][side].raw.unit = decl.value.match(QUANTITY)[2];
						}
						// Record value
						object[property][side].raw.string = decl.value.match(QUANTITY)[0];
						object[property][side].raw.number = Number(decl.value.match(QUANTITY)[1]);

					}
				}
				// console.log(object.padding);
				// decl.remove();
			}

		});
	}

	return object[property];
}
