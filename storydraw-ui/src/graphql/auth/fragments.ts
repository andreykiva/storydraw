import { gql } from '@/__generated__/gql';

export const AUTH_RESPONSE_FRAGMENT = gql(`
	fragment AuthResponseFragment on AuthResponse {
		access_token
		refresh_token
		user {
			id
			username
			displayName
			imageUrl
		}
	}
`);

export const GENERATE_CODE_RESPONSE_FRAGMENT = gql(`
	fragment GenerateCodeResponseFragment on GenerateCodeResponse {
		success
		message
	}
`);
