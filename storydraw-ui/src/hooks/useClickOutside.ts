import { useEffect } from 'react';

const useClickOutside = (refs: React.RefObject<HTMLElement>[], isCurrentOpen: boolean, callback: () => void) => {
	useEffect(() => {
		if (!isCurrentOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const isInside = refs.some((ref) => {
				return ref.current && ref.current.contains(event.target as Node);
			});

			if (!isInside) {
				callback();
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [refs, callback, isCurrentOpen]);
};

export default useClickOutside;
