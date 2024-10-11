import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as depthLimit from 'graphql-depth-limit';

export const graphqlConfig: ApolloDriverConfig = {
	driver: ApolloDriver,
	autoSchemaFile: 'src/schema.gql',
	validationRules: [depthLimit(4)],
	fieldResolverEnhancers: ['guards'],
	context: ({ req, res, connection }) => {
		if (connection) {
			const token = connection.context.token;
			return { token };
		}
		return { req, res };
	},
	subscriptions: {
		'graphql-ws': {
			onConnect: (context) => {
				const { token } = context.connectionParams;
				if (!token) {
					return false;
				}
				return { token };
			},
		},
		'subscriptions-transport-ws': true,
	},
};
