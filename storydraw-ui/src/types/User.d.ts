type User = {
	id: string;
	username: string;
	name: string;
	bio: string;
	image: string;
	followers: number;
	following: number;
	likes: number;
	isPrivate: boolean;
};

export default User;
