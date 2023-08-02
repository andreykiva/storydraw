import React, { useState } from 'react';
import styles from './Comment.module.css';
import ArrowIcon from '../../../../UI/icons/ArrowIcon';
import CommentContent from './CommentContent/CommentContent';
import Replies from './Replies/Replies';

const Comment = (props) => {
	const [showReplies, setShowReplies] = useState(false);
	const { replies } = props;

	const toggleReplies = () => {
		setShowReplies(!showReplies);
	};

	return (
		<div className={styles.Comment}>
			<CommentContent {...props} />
			{replies && !showReplies ? (
				<div className={styles.ViewRepliesBtn} onClick={toggleReplies}>
					View {replies} Replies
					<ArrowIcon className={styles.ArrowIcon} />
				</div>
			) : null}

			{showReplies && <Replies />}

			{showReplies && (
				<div className={styles.HideReplies}>
					<div className={styles.HideRepliesBtn} onClick={toggleReplies}>
						Hide
						<ArrowIcon className={styles.ArrowIcon} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Comment;
