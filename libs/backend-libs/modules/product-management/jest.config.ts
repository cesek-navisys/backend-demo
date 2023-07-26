/* eslint-disable */
export default {
	displayName: 'backend-libs-modules-product-management',
	preset: '../../../../jest.preset.js',
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]s$': [
			'ts-jest',
			{ tsconfig: '<rootDir>/tsconfig.spec.json' },
		],
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory:
		'../../../../coverage/libs/backend-libs/modules/product-management',
};
