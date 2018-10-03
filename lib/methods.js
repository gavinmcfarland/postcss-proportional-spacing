import postcss from 'postcss';
import {object} from './get-properties';

const NUMBER = /^[+-]?\d*\.?\d*$/g;
const QUANTITY = /(?<number>[+-]?\d*\.?\d*)(?<unit>\w+)/

export function replaceValues(rule, property, name) {
	rule.walkDecls(decl => {

		// More accurate way of processing CSS
		var regex2 = new RegExp("^" + name + "$");
		var regex3 = new RegExp("^" + name + "-");

		let values = postcss.list.space(decl.value);
		let number;
		let unit;
		let newValue = [];

		if (decl.prop.match(regex2)) {

			for (let a = 0; a < values.length; a++) {
				if (values[a].match(NUMBER)) {
					if (a === 0) {
						number = property["right"].match(QUANTITY)[1];
						unit = property["right"].match(QUANTITY)[2];
						number *= values[a];
						object[name]['top'] = number + unit;
						newValue.push(number + unit);
					}
					if (a === 1) {
						number = property["top"].match(QUANTITY)[1];
						unit = property["top"].match(QUANTITY)[2];
						number *= values[a];
						object[name]['right'] = number + unit;
						newValue.push(number + unit)
					}
					if (a === 2) {
						number = property["right"].match(QUANTITY)[1];
						unit = property["right"].match(QUANTITY)[2];
						number *= values[a];
						object[name]['bottom'] = number + unit;
						newValue.push(number + unit)
					}
					if (a === 3) {
						number = property["top"].match(QUANTITY)[1];
						unit = property["top"].match(QUANTITY)[2];
						number *= values[a];
						object[name]['left'] = number + unit;
						newValue.push(number + unit)
					}
				}
				else {
					newValue.push(values[a])
				}
			}
			decl.value = newValue.join(" ");
		}

		if (decl.prop.match(regex3)) {
			if (decl.value.match(NUMBER)) {
				if (decl.prop === name + "-top") {
					number = property["right"].match(QUANTITY)[1];
					unit = property["right"].match(QUANTITY)[2];
					number *= decl.value;
					object[name]['top'] = number + unit;
					decl.value = number + unit;
				}
				if (decl.prop === name + "-right") {
					number = property["top"].match(QUANTITY)[1];
					unit = property["top"].match(QUANTITY)[2];
					number *= decl.value;
					object[name]['right'] = number + unit;
					decl.value = number + unit;
				}
				if (decl.prop === name + "-bottom") {
					number = property["right"].match(QUANTITY)[1];
					unit = property["right"].match(QUANTITY)[2];
					number *= decl.value;
					object[name]['bottom'] = number + unit;
					decl.value = number + unit;
				}
				if (decl.prop === name + "-left") {
					number = property["top"].match(QUANTITY)[1];
					unit = property["top"].match(QUANTITY)[2];
					number *= decl.value;
					object[name]['left'] = number + unit;
					decl.value = number + unit;
				}
			}
		}
	});
}

// Simpler but not as accurate
// for (let side in padding) {
//
// 	if (padding[side].match(NUMBER)) {
// 		let number;
// 		let unit;
// 		if (side === "top" || side === "bottom") {
// 			number = padding["right"].match(QUANTITY)[1];
// 			unit = padding["right"].match(QUANTITY)[2];
// 			number *= padding[side];
// 		}
// 		if (side === "right" || side === "left") {
//
// 			number = padding["top"].match(QUANTITY)[1];
// 			unit = padding["top"].match(QUANTITY)[2];
// 			number *= padding[side];
// 		}
// 		rule.append({ prop: 'padding-' + side, value: number + unit })
// 	}
// 	else {
// 		rule.append({ prop: 'padding-' + side, value: padding[side] })
// 	}
//
// }
