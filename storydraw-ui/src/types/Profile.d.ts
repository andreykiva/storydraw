import type User from '@/types/User';
import type Story from '@/types/Story';

export type RelationsUser = Pick<User, 'id' | 'username' | 'name' | 'image'> & {
	isFollowedByYou: boolean;
	isFollowedYou: boolean;
};

export type ProfileStory = Pick<Story, 'id' | 'story' | 'description' | 'tags' | 'views'>;
