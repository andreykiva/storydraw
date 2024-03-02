import React from 'react';
import styles from './EmojiPicker.module.css';
import { emojis } from './emojis';

type EmojiPickerProps = {
	onChange: (emoji: string) => void;
};

const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
	const handleEmojiPickerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	return (
		<div className={styles.EmojiPicker} onMouseDown={handleEmojiPickerMouseDown}>
			{emojis.map((emoji) => (
				<div className={styles.Emoji} key={emoji} onClick={onChange.bind(this, emoji)}>
					<span>{emoji}</span>
				</div>
			))}
		</div>
	);
};

export default EmojiPicker;
