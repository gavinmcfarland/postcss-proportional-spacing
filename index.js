import postcss from 'postcss';
import { getProperties } from './lib/get-properties';
import { updateProperties } from './lib/update-properties';
// import { replaceValues } from './lib/methods';

// const SIDES = /padding-top|padding-right|padding-bottom|padding-left/g;


export default postcss.plugin('postcss-proportional-spacing', opts => {
	console.log('opts', opts);

	return (root) => {
		root.walkRules(rule => {
			const paddingProps = getProperties(rule, "padding");
			updateProperties(paddingProps);
			// const marginProps = getProperties(rule, "margin");
			// replaceValues(rule, paddingProps, "padding");
			// replaceValues(rule, marginProps, "margin");
		});
	};


});
