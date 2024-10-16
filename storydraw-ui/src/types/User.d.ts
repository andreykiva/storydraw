type User = {
	id: string;
	username: string;
	displayName: string;
	bio: string;
	imageUrl?: string;
	followers: number;
	following: number;
	likes: number;
	isPrivate: boolean;
	isFollowedBy?: boolean;
	isFollowing?: boolean;
};

export default User;
