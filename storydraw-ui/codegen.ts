import { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
	schema: process.env.VITE_GRAPHQL_HTTP || '',
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
