import React from 'react';
import styles from './HTag.module.css';

const Htag = ({ tag, className, children }) => {
	switch (tag) {
		case 'h1':
			return <h1 className={[styles.H1, className].join(' ')}>{children}</h1>;
		case 'h2':
			return <h2 className={[styles.H2, className].join(' ')}>{children}</h2>;
		case 'h3':
			return <h3 className={[styles.H3, className].join(' ')}>{children}</h3>;
		case 'h4':
			return <h4 className={[styles.H4, className].join(' ')}>{children}</h4>;
		case 'h5':
			return <h5 className={[styles.H5, className].join(' ')}>{children}</h5>;
		case 'h6':
			return <h6 className={[styles.H6, className].join(' ')}>{children}</h6>;
		default:
			return <>{children}</>;
	}
};

export default Htag;
