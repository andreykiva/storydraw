import React from 'react';

const InboxIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg {...props} width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
			<path d="M7 7H15" stroke="#D1D1D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M7 11H11" stroke="#D1D1D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			<path
				d="M19 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17H8L11.6464 20.6464C11.8417 20.8417 
				12.1583 20.8417 12.3536 20.6464L16 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3Z"
				stroke="#D1D1D1"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

export default InboxIcon;
