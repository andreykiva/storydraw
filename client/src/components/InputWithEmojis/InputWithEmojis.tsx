import React, { useState, useRef } from 'react';
import styles from './InputWithEmojis.module.css';
import EmojiPicker from './EmojiPicker/EmojiPicker';

const InputWithEmojis = () => {
	const [value, setValue] = useState('');
	const contentEditableRef = useRef(null);

	console.log(value);

	const handleInput = () => {
		setValue(contentEditableRef.current.textContent);
	};

	const handleEmojiPick = (emoji: string) => {
		const contentEditable = contentEditableRef.current;

		const range = document.createRange();
		const selection = window.getSelection();
		selection.modify('extend', 'backward', 'paragraphboundary');

		const position = selection.toString().length;
		if (selection.anchorNode != undefined) selection.collapseToEnd();

		const beforeText = contentEditable.textContent.substring(0, position);
		const afterText = contentEditable.textContent.substring(position);

		const beforeTextNode = document.createTextNode(beforeText);
		const afterTextNode = document.createTextNode(afterText);

		range.setStart(contentEditable, 0);
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);

		contentEditable.textContent = '';

		const emojiNode = document.createTextNode(emoji);

		range.deleteContents();
		range.insertNode(afterTextNode);
		range.insertNode(emojiNode);
		range.insertNode(beforeTextNode);

		range.setStartAfter(emojiNode);
		range.collapse(true);

		handleInput();
	};

	return (
		<div className={styles.InputWithEmojis}>
			<div
				ref={contentEditableRef}
				className={styles.ContentEditable}
				contentEditable="true"
				onChange={handleInput}
			>
				{/* {value} */}
			</div>
			<EmojiPicker onChange={handleEmojiPick} />
		</div>
	);
};

export default InputWithEmojis;
