import postcss from 'postcss';
import {object} from './get-properties';

const NUMBER = /^[+-]?\d*\.?\d*$/g;
const QUANTITY = /(?<number>[+-]?\d*\.?\d*)(?<unit>\w+)/
const ZERO = /^0\w*$/

export function updateProperties(property) {
	console.log(property);
	for (let side in property) {
		let value;
		let number = property[side].raw.number;
		let unit = property[side].raw.unit;
		let ratio = property[side].raw.ratio;

		if (ratio) {
			switch(side) {
				case "top":
					if (property["right"].raw.number === 0) {
						value = number * property["left"].raw.number + property["left"].raw.unit;
					}
					else {
						value = number * property["right"].raw.number + property["right"].raw.unit;
					}
					// falls through
				case "right":
					if (property["top"].raw.number === 0) {
						value = number * property["bottom"].raw.number + property["bottom"].raw.unit;
					}
					else {
						value = number * property["top"].raw.number + property["top"].raw.unit;
					}
					// falls through
				case "bottom":
					if (property["right"].raw.number === 0) {
						value = number * property["left"].raw.number + property["left"].raw.unit;
					}
					else {
						value = number * property["right"].raw.number + property["right"].raw.unit;
					}
					// falls through
				case "left":
					if (property["top"].raw.number === 0) {
						value = number * property["bottom"].raw.number + property["bottom"].raw.unit;
					}
					else {
						value = number * property["top"].raw.number + property["top"].raw.unit;
					}

			}
		}
		else {
			value = property[side].raw.number + property[side].raw.unit;
		}

		property[side].value = value;
	}
	console.log(property);
}

// export function updateProperties() {
// 	console.log("object ---- ");
// 	console.log(object);
// 	for (let side in object.padding) {
// 		if (object.padding[side].raw.match(NUMBER)) {
// 			let number = object.padding[side].raw;
// 			if (side === "top") {
// 				console.log("top right --- " + number + " --- " + object.padding["right"].raw);
// 				console.log(number * object.padding["right"].raw.match(QUANTITY)[1]);
// 				object.padding[side].value = number * object.padding["right"].raw.match(QUANTITY)[1];
// 			}
// 			if (side === "right") {
// 				console.log("right top --- " + number + " --- " + object.padding["top"].raw);
// 				console.log(number * object.padding["top"].raw.match(QUANTITY)[1]);
// 				object.padding[side].value = number * object.padding["top"].raw.match(QUANTITY)[1];
// 			}
// 			if (side === "bottom") {
// 				console.log("bottom right --- " + number + " --- " + object.padding["right"].raw);
// 				console.log(number * object.padding["right"].raw.match(QUANTITY)[1]);
// 				object.padding[side].value = number * object.padding["right"].raw.match(QUANTITY)[1];
// 			}
// 			if (side === "left") {
// 				console.log("left top --- " + number + " --- " + object.padding["top"].raw);
// 				console.log(number * object.padding["top"].raw.match(QUANTITY)[1]);
// 				object.padding[side].value = number * object.padding["top"].raw.match(QUANTITY)[1];
// 			}
//
// 		}
// 	}
// 	console.log(object);
// }
