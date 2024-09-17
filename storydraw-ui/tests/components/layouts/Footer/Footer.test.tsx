import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Footer from '@/components/layouts/Footer/Footer';

describe('Footer', () => {
	it('should render without crashing', () => {
		render(<Footer />);
		expect(screen.getByText('© 2024 StoryDraw')).toBeInTheDocument();
	});
});
