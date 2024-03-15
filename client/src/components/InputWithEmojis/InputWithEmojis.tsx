import React, { useState, useRef } from 'react';
import styles from './InputWithEmojis.module.css';
import EmojiPicker from './EmojiPicker/EmojiPicker';
import Button from '@/components/ui/buttons/Button/Button';
import emojiIcon from '@/assets/icons/messages/emoji.svg?url';
import sendiIcon from '@/assets/icons/messages/send.svg?url';
import useClickOutside from '@/hooks/useClickOutside';
import Prompt from '@/components/ui/Prompt/Prompt';

// type UndoStack = {
// 	text: string;
// 	caretPosition: number;
// };

const InputWithEmojis = () => {
	const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
	const [value, setValue] = useState('');
	const contentEditableRef = useRef<HTMLDivElement>(null);
	const emojiPickerRef = useRef<HTMLDivElement>(null);
	const emojiPickerSectionRef = useRef<HTMLDivElement>(null);
	const isValueNotEmpty = value.length > 0;
	// const undoStack: UndoStack[] = [];
	// const redoStack: string[] = [];
	const [history, setHistory] = useState(['']);
	const [currentIndex, setCurrentIndex] = useState(0);

	const setHistoryValue = (value: string) => {
		let newHistory = history.slice(0, currentIndex + 1);
		newHistory.push(value);

		if (newHistory.length > 10) {
			newHistory = newHistory.slice(newHistory.length - 10);
		}

		setHistory(newHistory);
		setCurrentIndex(newHistory.length - 1);
	};

	//?DONE
	useClickOutside([emojiPickerSectionRef, emojiPickerRef], () => {
		setIsEmojiPickerOpen(false);
	});

	//?DONE
	const handleEmojiPickerToggle = () => {
		setIsEmojiPickerOpen(!isEmojiPickerOpen);
	};

	const handleInputChange = () => {
		const newValue = contentEditableRef.current.textContent;
		setHistoryValue(newValue);
		setValue(newValue);
	};

	const handleUndo = () => {
		setCurrentIndex((currentIndex) => {
			const newIndex = Math.max(currentIndex - 1, 0);
			const newValue = history[newIndex];
			contentEditableRef.current.textContent = newValue;
			setValue(newValue);
			return newIndex;
		});
	};
	const handleRedo = () => {
		setCurrentIndex((currentIndex) => {
			const newIndex = Math.min(currentIndex + 1, history.length - 1);
			const newValue = history[newIndex];
			contentEditableRef.current.textContent = newValue;
			setValue(newValue);
			return newIndex;
		});
	};

	//?DONE
	const insertText = (text: string) => {
		const contentEditable = contentEditableRef.current;
		if (!contentEditable) return;

		contentEditable.focus();

		const selection = window.getSelection();
		if (!selection) return;

		const range = selection.getRangeAt(0);

		const existingText = contentEditable.textContent || '';
		const textNode = document.createTextNode(text);

		range.deleteContents();

		if (!existingText.endsWith('\u200B')) {
			contentEditable.appendChild(document.createTextNode('\u200B'));
		}

		range.insertNode(textNode);

		range.setStartAfter(textNode);
		range.collapse(true);

		selection.removeAllRanges();
		selection.addRange(range);

		handleInputChange();
	};

	//?DONE
	const handleInputPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
		e.preventDefault();
		const text = e.clipboardData.getData('text/plain');
		insertText(text);
	};

	//?DONE
	const handleSendMessage = () => {
		contentEditableRef.current.textContent = '';
		setValue('');
	};

	//?DONE
	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		switch (e.code) {
			case 'KeyZ':
				if (e.ctrlKey) {
					e.preventDefault();
					handleUndo();
				}
				break;
			case 'KeyY':
				if (e.ctrlKey) {
					e.preventDefault();
					handleRedo();
				}
				break;
			case 'Enter':
				if (e.shiftKey) {
					e.preventDefault();
					insertText('\n');
				} else {
					e.preventDefault();
					handleSendMessage();
				}
				break;
			default:
				break;
		}
	};

	//?DONE
	return (
		<div className={styles.InputWithEmojisForm}>
			<div className={[styles.InputContainer, isValueNotEmpty && styles.Constrained].join(' ')}>
				{!isValueNotEmpty && <div className={styles.Placeholder}>Send a message...</div>}
				<div className={styles.InpurWrapper}>
					<div
						ref={contentEditableRef}
						className={styles.EmojisInput}
						contentEditable="true"
						onInput={handleInputChange}
						onPaste={handleInputPaste}
						onKeyDown={handleInputKeyDown}
					></div>
				</div>
				<div
					className={[styles.TogglePickerSection, isEmojiPickerOpen && styles.Active].join(' ')}
					ref={emojiPickerSectionRef}
				>
					<button className={styles.TogglePickerBtn} onClick={handleEmojiPickerToggle}>
						<img src={emojiIcon} alt="Emoji" className={styles.EmojiIcon} />
					</button>
					<Prompt pos="above" className={styles.Prompt}>
						Click to add emojis
					</Prompt>
				</div>
				{isEmojiPickerOpen && (
					<div ref={emojiPickerRef}>
						<EmojiPicker onSelect={insertText} />
					</div>
				)}
			</div>
			{isValueNotEmpty && (
				<Button type="submit" className={styles.SendBtn} onClick={handleSendMessage}>
					<img src={sendiIcon} alt="Send" className={styles.SendIcon} />
				</Button>
			)}
		</div>
	);
};

export default InputWithEmojis;
