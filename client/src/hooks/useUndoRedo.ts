import { useState, useEffect, useCallback } from 'react';

const useUndoRedo = (
	inputRef: React.RefObject<HTMLElement>,
	limit: number = 10,
	callback: (text: string, caretPosition: number, newIndex: number) => void,
) => {
	const [history, setHistory] = useState([{ text: '', caretPosition: 0 }]);
	const [currentIndex, setCurrentIndex] = useState(0);

	const set = (value: string, caretPos: number) => {
		let newHistory = history.slice(0, currentIndex + 1);

		newHistory.push({ text: value, caretPosition: caretPos });

		if (newHistory.length > limit) {
			newHistory = newHistory.slice(newHistory.length - limit);
		}

		setHistory(newHistory);
		setCurrentIndex(newHistory.length - 1);
	};
	const undo = useCallback(() => {
		const newIndex = Math.max(currentIndex - 1, 0);
		const { text, caretPosition } = history[newIndex];

		callback(text, caretPosition, newIndex);
	}, [currentIndex, history, callback]);

	const redo = useCallback(() => {
		const newIndex = Math.min(currentIndex + 1, history.length - 1);
		const { text, caretPosition } = history[newIndex];

		callback(text, caretPosition, newIndex);
	}, [currentIndex, history, callback]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (inputRef.current && inputRef.current === document.activeElement) {
				if (e.ctrlKey && e.key === 'z') {
					e.preventDefault();
					undo();
				} else if (e.ctrlKey && e.key === 'y') {
					e.preventDefault();
					redo();
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [undo, redo, inputRef]);

	return [history[currentIndex], set, undo, redo];
};

export default useUndoRedo;
