import React, { useEffect } from 'react';

const useClickOutside = (refs: React.RefObject<HTMLElement>[], callback: () => void) => {
	useEffect(() => {
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
	}, [refs, callback]);
};

export default useClickOutside;
