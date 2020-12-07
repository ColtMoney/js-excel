module.exports = {
	'parser': 'babel-eslint',
	'env': {
		'browser': true,
		'node': true,
		'es6': true
	},
	'extends': ['eslint:recommended', 'google'],
	'rules': {
		'semi': 'off',
		'comma-dangle': 'off',
		'linebreak-style': 'off',
		'indent': 'off',
		'keyword-spacing': 'off',
		'arrow-parens': 'off',
		'padded-blocks': 'off',
		'eol-last': 'off',
		'no-tabs': 'off'
	},
};
