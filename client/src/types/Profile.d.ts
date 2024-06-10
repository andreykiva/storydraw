import User from '@/types/User';

export type RelationsUser = Pick<User, 'id' | 'username' | 'name' | 'image'> & {
	isFollowedByYou: boolean;
	isFollowedYou: boolean;
};
