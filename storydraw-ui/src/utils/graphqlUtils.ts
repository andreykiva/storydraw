import { ApolloError } from '@apollo/client';

interface GraphQLExtensionsErrors {
	[key: string]: string;
}

export const transformError = (error: ApolloError) => {
	if (!error || !error.graphQLErrors || error.graphQLErrors.length === 0) {
		return null;
	}

	const transformedErrors: GraphQLExtensionsErrors = {};

	error.graphQLErrors.forEach(({ extensions }) => {
		if (extensions && extensions.errors) {
			const errors = extensions.errors as GraphQLExtensionsErrors;

			Object.keys(errors).forEach((key) => {
				if (!transformedErrors[key]) {
					transformedErrors[key] = errors[key];
				}
			});
		}
	});

	return transformedErrors;
};
