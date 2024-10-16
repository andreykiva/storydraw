import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: import.meta.env.VITE_GRAPHQL_HTTP,
	documents: ['src/**/*.{ts,tsx}'],
	generates: {
		'./src/__generated__/': {
			preset: 'client',
			plugins: [],
			presetConfig: {
				gqlTagName: 'gql',
				fragmentMasking: false,
			},
		},
		'./src/__generated__/schema-types.ts': {
			plugins: ['typescript'],
		},
	},
	ignoreNoDocuments: true,
};

export default config;
