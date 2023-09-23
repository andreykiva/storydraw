import React from 'react';

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg {...props} width="24px" height="24px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
			<path
				stroke="#ffffff"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M17 5L8 15l-5-4"
			/>
		</svg>
	);
};

export default CheckIcon;
