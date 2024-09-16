import { gql } from '@apollo/client';

export const NEW_NOTIFICATIONS_COUNT_SUBSCRIPTION = gql`
	subscription NnewNotificationsCountSubscription {
		newNotificationsCountUpdated {
			count
		}
	}
`;
