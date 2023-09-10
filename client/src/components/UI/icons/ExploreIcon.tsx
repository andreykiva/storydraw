import React from 'react';

const ExploreIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			{...props}
			width="24px"
			height="24px"
			viewBox="0 0 24 24"
			fill="#ffffff"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475
				 2,12 C2,6.4771525 6.4771525,2 12,2 Z M17.9842695,7.39078625 C18.1985588,6.64477525 17.4973604,5.9435768
				 16.7513494,6.1578661 L16.6494246,6.19284365 L9.57835679,9.02127078 L9.47282273,9.07079854 C9.30957453,
				 9.15937167 9.17428758,9.29167162 9.08209683,9.45256344 L9.02127078,9.57835679 L6.19284365,16.6494246
				 L6.1578661,16.7513494 C5.9435768,17.4973604 6.64477525,18.1985588 7.39078625,17.9842695 L7.49271102,
				 17.949292 L14.5637788,15.1208648 L14.6693129,15.0713371 C14.8325611,14.982764 14.967848,14.850464 15.
				 0600388,14.6895722 L15.1208648,14.5637788 L17.949292,7.49271102 L17.9842695,7.39078625 Z M12,10 C13.
				 1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 C10.8954305,14 10,13.1045695 10,12
				 C10,10.8954305 10.8954305,10 12,10 Z"
			/>
		</svg>
	);
};

export default ExploreIcon;
