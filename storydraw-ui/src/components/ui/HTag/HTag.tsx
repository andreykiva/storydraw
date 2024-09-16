import cn from 'classnames';
import styles from './HTag.module.scss';

type HtagProps = React.HTMLProps<HTMLHeadingElement> & {
	tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

const HTag = ({ tag, className, children }: HtagProps) => {
	switch (tag) {
		case 'h1':
			return <h1 className={cn(styles.H1, className)}>{children}</h1>;
		case 'h2':
			return <h2 className={cn(styles.H2, className)}>{children}</h2>;
		case 'h3':
			return <h3 className={cn(styles.H3, className)}>{children}</h3>;
		case 'h4':
			return <h4 className={cn(styles.H4, className)}>{children}</h4>;
		case 'h5':
			return <h5 className={cn(styles.H5, className)}>{children}</h5>;
		case 'h6':
			return <h6 className={cn(styles.H6, className)}>{children}</h6>;
		default:
			return <>{children}</>;
	}
};

export default HTag;
