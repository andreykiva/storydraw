import React, { useState } from 'react';
import styles from './InteractionsMenu.module.scss';
import InteractionsItem from './InteractionsItem/InteractionsItem';

const InteractionsMenu = () => {
	const [isLikesActive, setIsLikesActive] = useState(true);
	const [isCommentsActive, setIsCommentsActive] = useState(true);
	const [isNewFollowersActive, setIsNewFollowersActive] = useState(true);
	const [isMentionsAndTagsActive, setIsMentionsAndTagsActive] = useState(true);

	return (
		<div className={styles.InteractionsMenu}>
			<InteractionsItem
				title="Likes"
				checked={isLikesActive}
				onChange={() => setIsLikesActive(!isLikesActive)}
			/>
			<InteractionsItem
				title="Comments"
				checked={isCommentsActive}
				onChange={() => setIsCommentsActive(!isCommentsActive)}
			/>
			<InteractionsItem
				title="New followers"
				checked={isNewFollowersActive}
				onChange={() => setIsNewFollowersActive(!isNewFollowersActive)}
			/>
			<InteractionsItem
				title="Mentions and tags"
				checked={isMentionsAndTagsActive}
				onChange={() => setIsMentionsAndTagsActive(!isMentionsAndTagsActive)}
			/>
		</div>
	);
};

export default InteractionsMenu;
