import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContex } from './context/AuthContext';
import { useFetchData } from './hooks/useFetchData';
import App from './App';

// Mock the `useFetchData` hook
vi.mock('./hooks/useFetchData', () => ({
    useFetchData: vi.fn(),
}));

describe('App Component', () => {
    it('renders Navbar and AppRoutes with mock data', () => {
        // Mocked data
        (useFetchData as jest.Mock).mockReturnValue({
            categories: [{ id: '1', name: 'Desserts' }],
            latestRecipes: [{ id: '101', name: 'Recipe 1' }],
            currentUser: { name: 'Test User', email: 'test@example.com' },
        });

        render(
            <MemoryRouter>
                <AuthContex.Provider value={{ name: 'Test User', email: 'test@example.com' }}>
                    <App />
                </AuthContex.Provider>
            </MemoryRouter>
        );

        // Debug the rendered output
        screen.debug();

        // Assertions
        expect(screen.getByText(/Desserts/i)).toBeInTheDocument();
        expect(screen.getByText(/Recipe 1/i)).toBeInTheDocument();
    });
});
