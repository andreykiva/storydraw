import React from 'react';
import { Link } from 'react-router-dom';
import { escapeRegExp } from './regexpUtils';

export const highlightText = (text: string, searchTerm: string, className: string) => {
	if (!searchTerm) {
		return text;
	}

	const escapedSearchTerm = escapeRegExp(searchTerm);
	const regex = new RegExp(`(${escapedSearchTerm})`, 'ig');
	const parts = text.split(regex);

	return parts.map((part, index) =>
		regex.test(part) ? (
			<span key={index} className={className}>
				{part}
			</span>
		) : (
			part
		),
	);
};

export const isEmail = (text: string) => {
	if (text.includes('@')) return true;
	return false;
};

export const wrapMentions = (text: string, className?: string) => {
	const parts = text.split(/(\s+|[,!?.]+)/);

	const jsx = parts.map((part, index) => {
		if (part.startsWith('@')) {
			return (
				<Link to={`/${part}`} key={part + index} className={className}>
					{part}
				</Link>
			);
		} else {
			return part;
		}
	});

	return <>{jsx}</>;
};
