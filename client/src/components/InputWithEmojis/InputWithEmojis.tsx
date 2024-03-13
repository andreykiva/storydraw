import React, { useState, useRef, useEffect } from 'react';
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
	// const undoStack: string[] = [];
	const [undoStack, setUndoStack] = useState([]);
	// let redoStack: string[] = [];

	//TODO
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.code === 'KeyZ') {
				event.preventDefault();
				handleUndo();
			}
			// Проверяем, нажат ли Ctrl+Y
			// else if (event.ctrlKey && event.code === 'KeyY') {
			// 	event.preventDefault(); // Предотвращаем стандартное действие браузера (повтор предыдущего действия)
			// 	handleRedo(); // Вызываем функцию повтора действия
			// }
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [undoStack]);

	//?DONE
	useClickOutside([emojiPickerBtnRef, emojiPickerRef], () => {
		setIsEmojiPickerOpen(false);
	});

	//?DONE
	const handleEmojiPickerToggle = () => {
		setIsEmojiPickerOpen(!isEmojiPickerOpen);
	};

	//?DONE
	const handleInputChange = () => {
		const newValue = contentEditableRef.current.textContent;
		setUndoStack([...undoStack, value]);

		console.log(undoStack);

		setValue(newValue);
	};

	//TODO
	const handleUndo = () => {
		if (undoStack.length > 0) {
			const stack = [...undoStack];
			const prevState = stack.pop();
			contentEditableRef.current.textContent = '';
			insertText(prevState);
			setUndoStack(stack);
		}
	};

	//TODO
	// const handleRedo = () => {
	// 	if (redoStack.length > 0) {
	// 		const nextState = redoStack.pop(); // извлекаем состояние, которое мы отменили с помощью handleUndo
	// 		insertText(nextState); // восстанавливаем его
	// 	}
	// };

	//?DONE
	const insertText = (text: string) => {
		const contentEditable = contentEditableRef.current;
		if (!contentEditable) return;

		contentEditable.focus();

		const selection = window.getSelection();
		if (!selection) return;

		const range = selection.getRangeAt(0);
		const textNode = document.createTextNode(text);

		range.deleteContents();
		range.insertNode(textNode);

		range.setStartAfter(textNode);
		range.collapse(true);

		selection.removeAllRanges();
		selection.addRange(range);

		// handleInputChange();
	};

	//?DONE
	const handleInputPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
		e.preventDefault();
		const text = e.clipboardData.getData('text/plain');

		insertText(text);
	};

	return (
		<div className={styles.InputWithEmojisForm}>
			<div className={[styles.InputContainer, isValueNotEmpty && styles.Constrained].join(' ')}>
				{/* {!isValueNotEmpty && <div className={styles.Placeholder}>Send a message...</div>} */}
				<div
					ref={contentEditableRef}
					className={styles.EmojisInput}
					contentEditable="true"
					onInput={handleInputChange}
					onPaste={handleInputPaste}
				></div>
				<button className={styles.TogglePickerBtn} onClick={handleEmojiPickerToggle} ref={emojiPickerBtnRef}>
					<img src={emojiIcon} alt="Emoji" className={styles.EmojiIcon} />
				</button>
				{isEmojiPickerOpen && (
					<div ref={emojiPickerRef}>
						<EmojiPicker onSelect={insertText} />
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
