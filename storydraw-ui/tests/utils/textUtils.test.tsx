import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { highlightText, isEmail, wrapMentions } from '@/utils/textUtils';
import '@testing-library/jest-dom/vitest';

describe('highlightText', () => {
	it('should return the text unchanged if searchTerm is empty', () => {
		const text = 'Hello world';
		const searchTerm = '';
		const className = 'highlight';
		render(<>{highlightText(text, searchTerm, className)}</>);

		expect(screen.getByText(text)).toBeInTheDocument();
	});

	it('should wrap searchTerm in span with className if searchTerm is found in text', () => {
		const text = 'Hello world';
		const searchTerm = 'world';
		const className = 'highlight';
		render(<>{highlightText(text, searchTerm, className)}</>);

		const highlightedSpan = screen.getByText(searchTerm).closest('span');
		expect(highlightedSpan).toHaveClass(className);
		expect(highlightedSpan).toBeInTheDocument();
	});

	it('should not highlight text if searchTerm is not found', () => {
		const text = 'Hello world';
		const searchTerm = 'notfound';
		const className = 'highlight';
		render(<>{highlightText(text, searchTerm, className)}</>);

		expect(screen.getByText(text)).toBeInTheDocument();
	});

	it('should correctly highlight multiple occurrences of searchTerm', () => {
		const text = 'Hello world, world';
		const searchTerm = 'world';
		const className = 'highlight';
		render(<>{highlightText(text, searchTerm, className)}</>);

		const spans = screen.getAllByText(searchTerm).map((span) => span.closest('span'));
		spans.forEach((span) => {
			expect(span).toHaveClass(className);
			expect(span).toBeInTheDocument();
		});
	});

	it('should correctly handle case-insensitive searchTerm', () => {
		const text = 'Hello World';
		const searchTerm = 'world';
		const className = 'highlight';
		render(<>{highlightText(text, searchTerm, className)}</>);

		const highlightedSpan = screen.getByText('World').closest('span');
		expect(highlightedSpan).toHaveClass(className);
		expect(highlightedSpan).toBeInTheDocument();
	});
});

describe('isEmail', () => {
	it('should return true for a string with an @ symbol', () => {
		expect(isEmail('test@example.com')).toBe(true);
	});

	it('should return false for a string without an @ symbol', () => {
		expect(isEmail('testexample.com')).toBe(false);
	});

	it('should return false for an empty string', () => {
		expect(isEmail('')).toBe(false);
	});

	it('should return true for a string with multiple @ symbols', () => {
		expect(isEmail('test@@example.com')).toBe(true);
	});
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
	<Router>
		<Routes>
			<Route path="/" element={children} />
		</Routes>
	</Router>
);

describe('wrapMentions', () => {
	it('should wrap mentions with Link component', () => {
		const text = 'Hello @user1 and @user2';
		render(<TestWrapper>{wrapMentions(text, 'mention-class')}</TestWrapper>);

		const user1Link = screen.getByText('@user1');
		const user2Link = screen.getByText('@user2');

		expect(user1Link).toBeInTheDocument();
		expect(user2Link).toBeInTheDocument();

		expect(user1Link).toHaveAttribute('href', '/@user1');
		expect(user2Link).toHaveAttribute('href', '/@user2');
	});

	it('should not modify text if no mentions are present', () => {
		const text = 'Hello world';
		render(<TestWrapper>{wrapMentions(text)}</TestWrapper>);

		expect(screen.getByText('Hello world')).toBeInTheDocument();
	});

	it('should handle mentions at the start and end of the text', () => {
		const text = '@user1 Hello @user2';
		render(<TestWrapper>{wrapMentions(text, 'mention-class')}</TestWrapper>);

		const user1Link = screen.getByText('@user1');
		const user2Link = screen.getByText('@user2');

		expect(user1Link).toBeInTheDocument();
		expect(user2Link).toBeInTheDocument();

		expect(user1Link).toHaveAttribute('href', '/@user1');
		expect(user2Link).toHaveAttribute('href', '/@user2');
	});

	it('should handle multiple mentions in sequence', () => {
		const text = '@user1@user2';
		render(<TestWrapper>{wrapMentions(text, 'mention-class')}</TestWrapper>);

		const user1Link = screen.getByText('@user1');
		const user2Link = screen.getByText('@user2');

		expect(user1Link).toBeInTheDocument();
		expect(user2Link).toBeInTheDocument();

		expect(user1Link).toHaveAttribute('href', '/@user1');
		expect(user2Link).toHaveAttribute('href', '/@user2');
	});

	it('should handle mentions followed by punctuation correctly', () => {
		const text = '@user1. Check this out! @user2, @user3';
		render(<TestWrapper>{wrapMentions(text, 'mention-class')}</TestWrapper>);

		const user1Link = screen.getByText('@user1');
		const user2Link = screen.getByText('@user2');
		const user3Link = screen.getByText('@user3');

		expect(user1Link).toBeInTheDocument();
		expect(user2Link).toBeInTheDocument();
		expect(user3Link).toBeInTheDocument();

		expect(user1Link).toHaveAttribute('href', '/@user1');
		expect(user2Link).toHaveAttribute('href', '/@user2');
		expect(user3Link).toHaveAttribute('href', '/@user3');
	});

	it('should handle mentions with various delimiters (spaces, commas, etc.) correctly', () => {
		const text = '@user1 @user2, @user3! @user4 (test) @user5';
		render(<TestWrapper>{wrapMentions(text, 'mention-class')}</TestWrapper>);

		const user1Link = screen.getByText('@user1');
		const user2Link = screen.getByText('@user2');
		const user3Link = screen.getByText('@user3');
		const user4Link = screen.getByText('@user4');
		const user5Link = screen.getByText('@user5');

		expect(user1Link).toBeInTheDocument();
		expect(user2Link).toBeInTheDocument();
		expect(user3Link).toBeInTheDocument();
		expect(user4Link).toBeInTheDocument();
		expect(user5Link).toBeInTheDocument();

		expect(user1Link).toHaveAttribute('href', '/@user1');
		expect(user2Link).toHaveAttribute('href', '/@user2');
		expect(user3Link).toHaveAttribute('href', '/@user3');
		expect(user4Link).toHaveAttribute('href', '/@user4');
		expect(user5Link).toHaveAttribute('href', '/@user5');
	});
});
