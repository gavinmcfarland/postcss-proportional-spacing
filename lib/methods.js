import postcss from "postcss";
import { object } from "./get-properties";

const NUMBER = /^(?!0+\d?$)^[+-]?\d*\.?\d*$/g;
const QUANTITY = /(?<number>[+-]?\d*\.?\d*)(?<unit>\w+)/;

export function replaceValues(rule, name) {
  rule.walkDecls(decl => {
    // More accurate way of processing CSS
    var regex2 = new RegExp("^" + name + "$");
    var regex3 = new RegExp("^" + name + "-");

    let values = postcss.list.space(decl.value);
    let newValue = [];

    if (decl.prop.match(regex2)) {
      for (let a = 0; a < values.length; a++) {
        if (values[a].match(NUMBER)) {
          if (a === 0) {
            newValue.push(object[name][a].value);
          }
          if (a === 1) {
            newValue.push(object[name][a].value);
          }
          if (a === 2) {
            newValue.push(object[name][a].value);
          }
          if (a === 3) {
            newValue.push(object[name][a].value);
          }
        } else {
          newValue.push(values[a]);
        }
      }
      decl.value = newValue.join(" ");
    }

    if (decl.prop.match(regex3)) {
      if (decl.value.match(NUMBER)) {
        if (decl.prop === name + "-top") {
          decl.value = object[name][0].value;
        }
        if (decl.prop === name + "-right") {
          decl.value = object[name][1].value;
        }
        if (decl.prop === name + "-bottom") {
          decl.value = object[name][2].value;
        }
        if (decl.prop === name + "-left") {
          decl.value = object[name][3].value;
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
