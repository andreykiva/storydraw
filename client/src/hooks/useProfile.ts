// import { useState, useEffect } from 'react';

// interface UseProfileProps {
// 	userId: string;
// }

// const useProfile = ({ userId }: UseProfileProps) => {
// 	const [isCurrentUser, setIsCurrentUser] = useState(false);
// 	const [isEditingProfile, setIsEditingProfile] = useState(false);
// 	const [isReportingUser, setIsReportingUser] = useState(false);
// 	const [isBlockingUser, setIsBlockingUser] = useState(false);

// 	useEffect(() => {
// 		if (currentUser?.id === userId) {
// 			setIsCurrentUser(true);
// 		}
// 	}, [currentUser, userId]);

// 	const toggleEditProfile = () => setIsEditingProfile(!isEditingProfile);
// 	const toggleReportUser = () => setIsReportingUser(!isReportingUser);
// 	const toggleBlockUser = () => setIsBlockingUser(!isBlockingUser);

// 	return {
// 		isCurrentUser,
// 		isEditingProfile,
// 		isReportingUser,
// 		isBlockingUser,
// 		toggleEditProfile,
// 		toggleReportUser,
// 		toggleBlockUser,
// 	};
// };

// export default useProfile;
