import postcss from "postcss";

// Regexes
const NUMBER = /^(?!0+\d?$)^[+-]?\d*\.?\d*$/g;
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
  ],
  margin: [
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
      let sides = object[property];

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
            sides[a].raw = decl.value;
            sides[a].number = Number(decl.value.match(QUANTITY)[1]);
            sides[a].unit = decl.value.match(QUANTITY)[2]
              ? decl.value.match(QUANTITY)[2]
              : "";
            sides[a].ratio = decl.value.match(NUMBER) ? true : false;
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
    let current = sides[a];
    let total = sides.length;
    let x = (total - (a + 1)) % 2;
    let y = a + (Math.floor(a / (total / 2)) * -total + total / 2);
    let topOrRight = sides[x];
    let bottomOrLeft = sides[x + 2];
    let opposite = sides[y];

    if (current.number === 0) {
      current.value = 0;
    }
    if (current.ratio) {
      if (topOrRight.ratio || topOrRight.raw === null) {
        if (bottomOrLeft.ratio || bottomOrLeft.raw === null) {
          if (opposite.ratio || opposite.raw === null) {
            current.value =
              current.number * topOrRight.number * opposite.number +
              topOrRight.unit;
          } else {
            current.value =
              opposite.number * topOrRight.number * current.number +
              opposite.unit;
          }
        } else {
          current.value =
            bottomOrLeft.number * current.number + bottomOrLeft.unit;
        }
      } else {
        current.value = current.number * topOrRight.number + topOrRight.unit;
      }
    } else {
      current.value = current.raw;
    }
  }
}
