import { gql } from '@apollo/client';

export const AUTH_RESPONSE_FIELDS = gql`
	fragment AuthResponseFields on AuthResponse {
		access_token
		refresh_token
		user {
			id
			username
			imageUrl
		}
	}
`;

export const GENERATE_CODE_RESPONSE_FIELDS = gql`
	fragment GenerateCodeResponseFields on GenerateCodeResponse {
		success
		message
	}
`;
