export const getCaretPosition = (): number => {
	const sel = window.getSelection();
	const range = sel.getRangeAt(0);

	return range.startOffset;
};

export const setCaretPosition = (element: HTMLElement, caretPos: number) => {
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
