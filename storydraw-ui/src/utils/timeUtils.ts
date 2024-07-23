export const debounce = <T extends (...args: unknown[]) => void>(
	func: T,
	delay: number,
	timerId: ReturnType<typeof setTimeout>,
	setTimerId: (id: ReturnType<typeof setTimeout>) => void,
) => {
	return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
		if (timerId) {
			clearTimeout(timerId);
		}

		const id = setTimeout(() => {
			func.apply(this, args);
		}, delay);
		
		setTimerId(id);
	};
};
