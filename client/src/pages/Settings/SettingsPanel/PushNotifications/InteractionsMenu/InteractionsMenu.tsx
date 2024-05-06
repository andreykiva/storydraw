import React, { useState } from 'react';
import styles from './InteractionsMenu.module.css';
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
				onChange={setIsLikesActive.bind(this, !isLikesActive)}
			/>
			<InteractionsItem
				title="Comments"
				checked={isCommentsActive}
				onChange={setIsCommentsActive.bind(this, !isCommentsActive)}
			/>
			<InteractionsItem
				title="New followers"
				checked={isNewFollowersActive}
				onChange={setIsNewFollowersActive.bind(this, !isNewFollowersActive)}
			/>
			<InteractionsItem
				title="Mentions and tags"
				checked={isMentionsAndTagsActive}
				onChange={setIsMentionsAndTagsActive.bind(this, !isMentionsAndTagsActive)}
			/>
		</div>
	);
};

export default InteractionsMenu;
