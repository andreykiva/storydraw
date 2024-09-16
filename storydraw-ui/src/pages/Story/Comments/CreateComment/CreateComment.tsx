import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './CreateComment.module.scss';
import InputWithEmojis from '@/components/InputWithEmojis/InputWithEmojis';
import { openAuthModal } from '@/features/auth/authSlice';
import { MENU_POSITION } from '@/constants/ui';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT, CREATE_REPLY } from '@/graphql/comments/mutations';
import { Comment, RepliedComment } from '@/types/Comment';
import closeIcon from '@/assets/icons/comments/close.svg';

type CreateCommentProps = {
	isAuth: boolean;
	storyId: string;
	repliedComment: RepliedComment | null;
	handleCreateComment: (newComment: Comment) => void;
	handleCreateReply: (commentId: string, newReply: Comment) => void;
	handleClearRepliedComment: () => void;
};

const CreateComment = (props: CreateCommentProps) => {
	const { isAuth, storyId, repliedComment } = props;
	const { handleCreateComment, handleCreateReply, handleClearRepliedComment } = props;
	const dispatch = useDispatch();
	const [value, setValue] = useState('');

	const [createComment] = useMutation(CREATE_COMMENT, {
		variables: {
			createCommentInput: {
				storyId,
				content: value,
			},
		},
		onCompleted(data) {
			handleCreateComment({
				...data.createComment,
				likesCount: 0,
				isLiked: false,
				repliesCount: 0,
			});
		},
		onError(error) {
			console.log(error);
		},
	});

	const [createReply] = useMutation(CREATE_REPLY, {
		variables: {
			createReplyInput: {
				commentId: repliedComment?.id,
				content: value,
			},
		},
		onCompleted(data) {
			handleCreateReply(repliedComment?.parentCommentId, {
				...data.createReply,
				likesCount: 0,
				isLiked: false,
			});
			handleClearRepliedComment();
		},
		onError(error) {
			console.log(error);
		},
	});

	const handleLogin = () => {
		dispatch(openAuthModal());
	};

	const handleSubmit = () => {
		if (repliedComment) {
			createReply();
		} else {
			createComment();
		}
		setValue('');
	};

	return (
		<div className={styles.CreateComment}>
			{repliedComment && (
				<div className={styles.RepliedComment}>
					<div className={styles.CommentInfo}>
						<span className={styles.DisplayName}>@{repliedComment.user.displayName}: </span>
						<span className={styles.CommentContent}>{repliedComment.content}</span>
					</div>
					<img src={closeIcon} alt="Close" className={styles.CloseIcon} onClick={handleClearRepliedComment} />
				</div>
			)}
			{isAuth ? (
				<InputWithEmojis
					value={value}
					onChange={setValue}
					onEnter={handleSubmit}
					maxValueLength={100}
					historyLimit={11}
					placeholder="Add comment..."
					menuPosition={MENU_POSITION.TOP_LEFT}
				/>
			) : (
				<div className={styles.LoginMessage} onClick={handleLogin}>
					Log in to comment
				</div>
			)}
		</div>
	);
};

export default CreateComment;
