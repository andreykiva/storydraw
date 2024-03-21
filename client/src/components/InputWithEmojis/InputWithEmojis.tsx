import React, { useState, useRef } from 'react';
import styles from './InputWithEmojis.module.css';
import EmojiPicker from './EmojiPicker/EmojiPicker';
import Button from '@/components/ui/buttons/Button/Button';
import Prompt from '@/components/ui/Prompt/Prompt';
import emojiIcon from '@/assets/icons/messages/emoji.svg?url';
import sendiIcon from '@/assets/icons/messages/send.svg?url';
import useClickOutside from '@/hooks/useClickOutside';

const InputWithEmojis = () => {
	const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
	const [value, setValue] = useState('');
	const contentEditableRef = useRef<HTMLDivElement>(null);
	const emojiPickerRef = useRef<HTMLDivElement>(null);
	const emojiPickerSectionRef = useRef<HTMLDivElement>(null);
	const isValueNotEmpty = value.length > 0;
	const [history, setHistory] = useState([{ text: '', caretPos: 0 }]);
	const [currentIndex, setCurrentIndex] = useState(0);

	const setValueAndCaretPosition = async (newValue: string, caretPos: number) => {
		await setValue(newValue);
		setCaretPosition(contentEditableRef.current, caretPos);
	};

	const getCaretPosition = (): number => {
		const sel = window.getSelection();
		const range = sel.getRangeAt(0);

		return range.startOffset;
	};

	const setHistoryValue = (value: string, caretPos: number = getCaretPosition()) => {
		let newHistory = history.slice(0, currentIndex + 1);

		newHistory.push({ text: value, caretPos: caretPos });

		if (newHistory.length > 10) {
			newHistory = newHistory.slice(newHistory.length - 10);
		}

		setHistory(newHistory);
		setCurrentIndex(newHistory.length - 1);
	};

	const setCaretPosition = (element: HTMLElement, caretPos: number) => {
		const range = document.createRange();
		const selection = window.getSelection();
		if (!selection) return;

		const textLength = element.textContent.length;

		if (caretPos <= textLength) {
			range.setStart(element.childNodes[0] || element, caretPos);
		} else {
			range.setStart(element.childNodes[0] || element, textLength - 1);
		}

		range.collapse(true);

		selection.removeAllRanges();
		selection.addRange(range);
	};

	useClickOutside([emojiPickerSectionRef, emojiPickerRef], () => {
		setIsEmojiPickerOpen(false);
	});

	const handleToggleEmojiPicker = () => {
		setIsEmojiPickerOpen(!isEmojiPickerOpen);
	};

	const handleChangeInput = (e: React.ChangeEvent<HTMLDivElement>) => {
		const contentEditable = contentEditableRef.current;
		if (document.activeElement !== contentEditable) return;

		const newValue = e.target.textContent;
		const caretPos = getCaretPosition();

		setValueAndCaretPosition(newValue, caretPos);
		setHistoryValue(newValue, caretPos);
	};

	const handleUndo = () => {
		const newIndex = Math.max(currentIndex - 1, 0);
		const { text, caretPos } = history[newIndex];

		setValueAndCaretPosition(text, caretPos);
		setCurrentIndex(newIndex);
	};

	const handleRedo = () => {
		const newIndex = Math.min(currentIndex + 1, history.length - 1);
		const { text, caretPos } = history[newIndex];

		setValueAndCaretPosition(text, caretPos);
		setCurrentIndex(newIndex);
	};

	const updateHistoryCaretPosition = (newCaretPos: number) => {
		const newHistory = [...history];
		newHistory[currentIndex].caretPos = newCaretPos;
		setHistory(newHistory);
	};

	const modifyText = (text: string) => {
		let modifiedValue = text.replace(/\u200B/g, '') + '\u200B';

		const selection = window.getSelection();
		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			const selectedText = range.toString();

			if (selectedText) {
				modifiedValue = modifiedValue.replace(selectedText, '');
				selection.removeAllRanges();
			}
		}

		return modifiedValue;
	};

	const insertText = (text: string) => {
		const caretPos = getCaretPosition();
		const modifiedValue = modifyText(value);

		const textBeforeCaret = modifiedValue.slice(0, caretPos);
		const textAfterCaret = modifiedValue.slice(caretPos);
		const newValue = textBeforeCaret + text + textAfterCaret;

		setValueAndCaretPosition(newValue, caretPos + text.length);
		updateHistoryCaretPosition(caretPos);
		setHistoryValue(newValue, caretPos);
	};

	const handlePasteInput = (e: React.ClipboardEvent<HTMLDivElement>) => {
		e.preventDefault();
		const text = e.clipboardData.getData('text/plain');
		insertText(text);
	};

	const handleSendMessage = () => {
		setValue('');
	};

	const handleKeyDownInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
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

	return (
		<div className={styles.InputWithEmojisForm}>
			<div className={[styles.InputContainer, isValueNotEmpty && styles.Constrained].join(' ')}>
				{!isValueNotEmpty && <div className={styles.Placeholder}>Send a message...</div>}
				<div className={styles.InpurWrapper}>
					<div
						className={styles.EmojisInput}
						contentEditable="true"
						dangerouslySetInnerHTML={{ __html: value }}
						ref={contentEditableRef}
						onInput={handleChangeInput}
						onPaste={handlePasteInput}
						onKeyDown={handleKeyDownInput}
					></div>
				</div>
				<div
					className={[styles.TogglePickerSection, isEmojiPickerOpen && styles.Active].join(' ')}
					ref={emojiPickerSectionRef}
				>
					<button className={styles.TogglePickerBtn} onClick={handleToggleEmojiPicker}>
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
