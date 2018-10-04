import postcss from "postcss";

// Regexes
const NUMBER = /^[+-]?\d*\.?\d*$/g;
const QUANTITY = /(?<number>[+-]?\d*\.?\d)(?<unit>\w+)?/;

export const object = {
  ratio: false,
  padding: [
    {
      name: "top",
      raw: null,
      number: 0,
      unit: "",
      ratio: false,
      value: null
    },
    {
      name: "right",
      raw: null,
      number: 0,
      unit: "",
      ratio: false,
      value: null
    },
    {
      name: "bottom",
      raw: null,
      number: 0,
      unit: "",
      ratio: false,
      value: null
    },
    {
      name: "left",
      raw: null,
      number: 0,
      unit: "",
      ratio: false,
      value: null
    }
  ]
};

export function getProperties(rule, property) {
  // Check if properties in rule contain a unitless number
  rule.walkDecls(/padding|margin/, decl => {
    const values = postcss.list.space(decl.value);
    for (let a = 0; a < values.length; a++) {
      if (values[a].match(NUMBER)) {
        object.ratio = true;
      }
    }
  });

  var regex1 = new RegExp("^" + property);

  // If not true avoid going through properties for no reason
  if (object.ratio) {
    // For each property which matches property
    rule.walkDecls(decl => {
      var regex2 = new RegExp("^" + property + "$");
      var regex3 = new RegExp("^" + property + "-");
      let sides = object.padding;

      // For shorthand properties
      if (decl.prop.match(regex2)) {
        // Populate values from shorthand notation
        let values = postcss.list.space(decl.value);

        switch (values.length) {
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
          sides[a].raw = values[a];
          sides[a].number = Number(values[a].match(QUANTITY)[1]);
          sides[a].unit = values[a].match(QUANTITY)[2]
            ? values[a].match(QUANTITY)[2]
            : "";
          sides[a].ratio = values[a].match(NUMBER) ? true : false;
        }
      }

      // / For sub properties
      if (decl.prop.match(regex3)) {
        for (let a = 0; a < sides.length; a++) {
          let side = sides[a];

          if (decl.prop === property + "-" + side.name) {
            sides[a].raw = values[a];
            sides[a].number = Number(values[a].match(QUANTITY)[1]);
            sides[a].unit = values[a].match(QUANTITY)[2]
              ? values[a].match(QUANTITY)[2]
              : "";
            sides[a].ratio = values[a].match(NUMBER) ? true : false;
          }
        }
      }
    });
  }

  return object[property];
}

export function setValues(property) {
  let sides = object[property];
  for (let a = 0; a < sides.length; a++) {
    let side = sides[a];
    let total = sides.length;
    let x = (total - (a + 1)) % 2;
    let y = a + (Math.floor(a / (total / 2)) * -total + total / 2);
    let adjacent = sides[x];
    let opposite = sides[y];
    let other = sides[x + 2];

    // If value is a ratio / percentage
    if (side.ratio) {
      // Before multiplying by the adjacent side check if 0
      if (adjacent.number === 0) {
        side.value = side.number * opposite.number + adjacent.unit;
      }

      // If it isn't 0
      else {
        if (adjacent.ratio) {
          if (other.ratio) {
            side.value = side.number * opposite.number + opposite.unit;
          } else {
            side.value = side.number * other.number + other.unit;
          }
        } else {
          side.value = side.number * adjacent.number + adjacent.unit;
        }
      }
    }

    // If not a ratio then just use as is
    else {
      side.value = side.raw;
    }

    if (a === 0) {
      console.log(
        "top ---    " +
          x +
          " -- " +
          (x + 2) +
          " -- " +
          y +
          " -- " +
          sides[0].value
      );
    }
    if (a === 1) {
      console.log(
        "right ---  " +
          x +
          " -- " +
          (x + 2) +
          " -- " +
          y +
          " -- " +
          sides[1].value
      );
    }
    if (a === 2) {
      console.log(
        "bottom --- " +
          x +
          " -- " +
          (x + 2) +
          " -- " +
          y +
          " -- " +
          sides[2].value
      );
    }
    if (a === 3) {
      console.log(
        "left ---   " +
          x +
          " -- " +
          (x + 2) +
          " -- " +
          y +
          " -- " +
          sides[3].value
      );
    }
  }
}
