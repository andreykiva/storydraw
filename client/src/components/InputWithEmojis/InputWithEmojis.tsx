import React, { useState, useRef } from 'react';
import styles from './InputWithEmojis.module.css';
import EmojiPicker from './EmojiPicker/EmojiPicker';
import Button from '@/components/ui/buttons/Button/Button';
import emojiIcon from '@/assets/icons/messages/emoji.svg?url';
import sendiIcon from '@/assets/icons/messages/send.svg?url';
import useClickOutside from '@/hooks/useClickOutside';

const InputWithEmojis = () => {
	const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
	const [value, setValue] = useState('');
	const contentEditableRef = useRef<HTMLDivElement>(null);
	const emojiPickerRef = useRef<HTMLDivElement>(null);
	const emojiPickerBtnRef = useRef<HTMLButtonElement>(null);
	const isValueNotEmpty = value.length > 0;

	useClickOutside([emojiPickerBtnRef, emojiPickerRef], () => {
		setIsEmojiPickerOpen(false);
	});

	const handleEmojiPickerToggle = () => {
		setIsEmojiPickerOpen(!isEmojiPickerOpen);
	};

	const handleInputChange = () => {
		setValue(contentEditableRef.current.textContent);
	};

	const pasteText = (text: string) => {
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

		const emojiNode = document.createTextNode(text);

		range.deleteContents();
		range.insertNode(afterTextNode);
		range.insertNode(emojiNode);
		range.insertNode(beforeTextNode);

		range.setStartAfter(emojiNode);
		range.collapse(true);

		handleInputChange();
	};

	const stripHtmlTags = (html: string) => {
		const doc = new DOMParser().parseFromString(html, 'text/html');
		return doc.body.textContent || "";
	};

	const handleInputPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
		const text = e.clipboardData.getData('text/plain');

		const cleanText = stripHtmlTags(text);


		// e.preventDefault();
		// const text = e.clipboardData.getData('text/plain');
		pasteText(cleanText);
		handleInputChange();
	};

	return (
		<div className={styles.InputWithEmojisForm}>
			<div className={[styles.InputContainer, isValueNotEmpty && styles.Constrained].join(' ')}>
				{!isValueNotEmpty && <div className={styles.Placeholder}>Send a message...</div>}
				<div
					ref={contentEditableRef}
					className={styles.EmojisInput}
					contentEditable="true"
					onInput={handleInputChange}
					onPaste={handleInputPaste}
				></div>
				<button
					className={styles.TogglePickerBtn}
					onClick={handleEmojiPickerToggle}
					ref={emojiPickerBtnRef}
				>
					<img src={emojiIcon} alt="Emoji" className={styles.EmojiIcon} />
				</button>
				{isEmojiPickerOpen && (
					<div ref={emojiPickerRef}>
						<EmojiPicker onSelect={pasteText} />
					</div>
				)}
			</div>
			{isValueNotEmpty && (
				<Button type="submit" className={styles.SendBtn}>
					<img src={sendiIcon} alt="Send" className={styles.SendIcon} />
				</Button>
			)}
		</div>
	);
};

export default InputWithEmojis;
