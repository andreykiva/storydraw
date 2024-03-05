import React from 'react';
import styles from './EmojiPicker.module.css';
import { emojis } from './emojis';
import Emoji from './Emoji/Emoji';

type EmojiPickerProps = {
	onSelect: (emoji: string) => void;
};

const EmojiPicker = ({ onSelect }: EmojiPickerProps) => {
	const handleEmojiPickerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	return (
		<div className={styles.EmojiPicker} onMouseDown={handleEmojiPickerMouseDown}>
			<div className={styles.Emojis}>
				{emojis.map((emojisCategory) => (
					<div className={styles.EmojisCategory} key={emojisCategory.category}>
						<span className={styles.CategoryName}>{emojisCategory.category}</span>
						<ul className={styles.EmojisList}>
							{emojisCategory.emojis.map((categoryEmoji) => (
								<Emoji emoji={categoryEmoji} onSelect={onSelect} key={categoryEmoji} />
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};

export default EmojiPicker;
