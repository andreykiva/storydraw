import React, { useState, useRef } from 'react';
import styles from './InputWithEmojis.module.css';
import EmojiPicker from './EmojiPicker/EmojiPicker';
import Button from '@/components/ui/buttons/Button/Button';
import Prompt from '@/components/ui/Prompt/Prompt';
import emojiIcon from '@/assets/icons/messages/emoji.svg?url';
import sendiIcon from '@/assets/icons/messages/send.svg?url';
import useClickOutside from '@/hooks/useClickOutside';
import { getCaretPosition, setCaretPosition } from '@/utils/caretUtils';

type InputWithEmojisProps = {
	value: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
	onEnter: () => void;
	maxValueLength: number;
	historyLimit: number;
	placeholder: string;
};

const InputWithEmojis = (props: InputWithEmojisProps) => {
	const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
	const contentEditableRef = useRef<HTMLDivElement>(null);
	const emojiPickerRef = useRef<HTMLDivElement>(null);
	const emojiPickerSectionRef = useRef<HTMLDivElement>(null);
	const [history, setHistory] = useState([{ text: '', caretPos: 0 }]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const { value, onChange, onEnter, maxValueLength, historyLimit, placeholder } = props;
	const valueLength = value.length;
	const isValueNotEmpty = valueLength > 0;

	const setValueAndCaretPosition = async (newValue: string, caretPos: number) => {
		await onChange(newValue);
		setCaretPosition(contentEditableRef.current, caretPos);
	};

	const setHistoryValue = (value: string, caretPos: number = getCaretPosition()) => {
		let newHistory = history.slice(0, currentIndex + 1);

		newHistory.push({ text: value, caretPos: caretPos });

		if (newHistory.length > historyLimit) {
			newHistory = newHistory.slice(newHistory.length - historyLimit);
		}

		setHistory(newHistory);
		setCurrentIndex(newHistory.length - 1);
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

		let newValue = e.target.textContent;
		let caretPos = getCaretPosition();

		if (newValue.length > maxValueLength) {
			newValue = value;
			contentEditable.textContent = newValue;
			caretPos--;
		} else {
			setHistoryValue(newValue, caretPos);
		}

		setValueAndCaretPosition(newValue, caretPos);
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
		let modifiedValue = text;

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
		contentEditableRef.current.focus();

		const caretPos = getCaretPosition();
		const modifiedValue = modifyText(value);

		const textBeforeCaret = modifiedValue.slice(0, caretPos);
		const textAfterCaret = modifiedValue.slice(caretPos);

		const remainingLength = maxValueLength - valueLength;
		const isLimit = remainingLength <= 0;
		if (isLimit) return;

		let newValue = '';
		let newText = text;

		if (text.length <= remainingLength) {
			newValue = textBeforeCaret + text + textAfterCaret;
		} else {
			newText = text.substring(0, remainingLength);
			newValue = textBeforeCaret + newText + textAfterCaret;
		}

		setValueAndCaretPosition(newValue, caretPos + newText.length);
		updateHistoryCaretPosition(caretPos);
		setHistoryValue(newValue, caretPos + newText.length);
	};

	const handlePasteInput = (e: React.ClipboardEvent<HTMLDivElement>) => {
		e.preventDefault();
		const text = e.clipboardData.getData('text/plain');
		insertText(text);
	};

	const handleSendMessage = () => {
		onEnter();
		setHistory([{ text: '', caretPos: 0 }]);
		setCurrentIndex(0);
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
				e.preventDefault();
				handleSendMessage();
				break;
			default:
				break;
		}
	};

	return (
		<div className={styles.InputWithEmojisForm}>
			<div className={[styles.InputContainer, isValueNotEmpty && styles.Constrained].join(' ')}>
				{!isValueNotEmpty && <div className={styles.Placeholder}>{placeholder}</div>}
				<div className={styles.InputSection}>
					<div className={styles.InpurWrapper}>
						<div
							className={styles.EmojisInput}
							contentEditable="true"
							ref={contentEditableRef}
							onInput={handleChangeInput}
							onPaste={handlePasteInput}
							onKeyDown={handleKeyDownInput}
							suppressContentEditableWarning={true}
						>{value}</div>
					</div>
					{valueLength >= Math.floor(maxValueLength / 10) && (
						<div className={styles.ValueLength}>
							{valueLength}/{maxValueLength}
						</div>
					)}
				</div>
				<div
					className={[styles.TogglePickerSection, isEmojiPickerOpen && styles.Active].join(' ')}
					ref={emojiPickerSectionRef}
				>
					<button className={styles.TogglePickerBtn} onClick={handleToggleEmojiPicker}>
						<img src={emojiIcon} alt="Emoji" className={styles.EmojiIcon} />
					</button>
					<Prompt position="topCenter" className={styles.Prompt}>
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
