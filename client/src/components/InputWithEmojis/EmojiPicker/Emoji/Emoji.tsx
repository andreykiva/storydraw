import React from 'react';
import styles from './Emoji.module.css';

type EmojiProps = {
	emoji: string;
	onSelect: (emoji: string) => void;
};

const Emoji = ({ emoji, onSelect }: EmojiProps) => {
	const handleEmojiSelect = () => {
		onSelect(emoji);
	};

	return (
		<li className={styles.Emoji} onClick={handleEmojiSelect}>
			{emoji}
		</li>
	);
};

export default Emoji;
