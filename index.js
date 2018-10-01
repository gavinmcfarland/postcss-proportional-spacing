import postcss from 'postcss';
import { getProperties } from './lib/get-properties';

// const SIDES = /padding-top|padding-right|padding-bottom|padding-left/g;

export default postcss.plugin('postcss-proportional-spacing', opts => {
	console.log('opts', opts);

	return (root) => {
		root.walkRules(rule => {
			const padding = getProperties(rule, "padding")
			getProperties(rule, "margin")
			console.log(padding);
		});
	};


});
