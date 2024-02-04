import React from 'react';

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			{...props}
			width="24px"
			height="24px"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M22 2L2 8.66667L11.5833 12.4167M22 2L15.3333 22L11.5833 12.4167M22 2L11.5833 12.4167"
				stroke="#D1D1D1"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

export default SendIcon;
