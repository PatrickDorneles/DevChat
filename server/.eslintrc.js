module.exports = {
	"env": {
		"es2021": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": 13,
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint",
		"eslint-plugin-import-helpers"
	],
	"rules": {
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"import-helpers/order-imports": [
			"warn",
			{ // example configuration
				newlinesBetween: "always",
				groups: [
					"/^@nestjs/", // any import paths starting with 'shared'
					"module", // then normal modules (ex: `lodash/pull`)
					["sibling", "parent"], // Then sibling and parent types. They can be mingled together
					"index", // Then the index file
				],
				alphabetize: { order: "asc", ignoreCase: true },
			},
		],
	}
}
