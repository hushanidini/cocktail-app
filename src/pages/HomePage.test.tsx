import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../pages/HomePage';
import { useFavorites } from '@/FavoritesContext';
import { mocked } from 'jest-mock';
import React from 'react';

jest.mock('../FavoritesContext');

const mockedUseFavorites = mocked(useFavorites);

describe('HomePage Component', () => {
    beforeEach(() => {
        mockedUseFavorites.mockReturnValue({
            addToFavorites: jest.fn(),
            removeFromFavorites: jest.fn(),
            favorites: [],
        });
    });

    test('renders the search input and button', () => {
        render(<HomePage />);

        expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    test('renders random cocktails on load', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                drinks: [
                    { idDrink: '1', strDrink: 'Margarita', strCategory: 'Cocktail', strDrinkThumb: 'margarita.jpg' },
                    { idDrink: '2', strDrink: 'Mojito', strCategory: 'Cocktail', strDrinkThumb: 'mojito.jpg' },
                ],
            }),
        });

        render(<HomePage />);

        await waitFor(() => {
            expect(screen.getByText('Margarita')).toBeInTheDocument();
            expect(screen.getByText('Mojito')).toBeInTheDocument();
        });

        expect(screen.getByAltText('Margarita')).toBeInTheDocument();
        expect(screen.getByAltText('Mojito')).toBeInTheDocument();
    });

    test('searches and displays cocktails based on user query', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                drinks: [
                    { idDrink: '3', strDrink: 'Daiquiri', strCategory: 'Cocktail', strDrinkThumb: 'daiquiri.jpg' },
                ],
            }),
        });

        render(<HomePage />);

        fireEvent.change(screen.getByPlaceholderText('Search products...'), { target: { value: 'Daiquiri' } });
        fireEvent.click(screen.getByRole('button', { name: /search/i }));

        await waitFor(() => {
            expect(screen.getByText('Daiquiri')).toBeInTheDocument();
        });

        expect(screen.getByAltText('Daiquiri')).toBeInTheDocument();
    });

    test('adds a cocktail to favorites when "Add to Favorites" is clicked', async () => {
        const mockAddToFavorites = jest.fn();
        mockedUseFavorites.mockReturnValue({
            addToFavorites: mockAddToFavorites,
            removeFromFavorites: jest.fn(),
            favorites: [],
        });

        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                drinks: [
                    { idDrink: '4', strDrink: 'Cosmopolitan', strCategory: 'Cocktail', strDrinkThumb: 'cosmopolitan.jpg' },
                ],
            }),
        });

        render(<HomePage />);

        await waitFor(() => {
            expect(screen.getByText('Cosmopolitan')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('button', { name: /add to favorites/i }));

        expect(mockAddToFavorites).toHaveBeenCalledWith({
            idDrink: '4',
            strDrink: 'Cosmopolitan',
            strCategory: 'Cocktail',
            strDrinkThumb: 'cosmopolitan.jpg',
        });
    });

    test('does not show "Add to Favorites" button if cocktail is already in favorites', async () => {
        mockedUseFavorites.mockReturnValue({
            addToFavorites: jest.fn(),
            removeFromFavorites: jest.fn(),
            favorites: [
                {
                    idDrink: '4',
                    strDrink: 'Cosmopolitan',
                    strDrinkThumb: 'cosmopolitan.jpg',
                    strCategory: 'Cocktail',
                },
            ],
        });

        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                drinks: [
                    { idDrink: '4', strDrink: 'Cosmopolitan', strCategory: 'Cocktail', strDrinkThumb: 'cosmopolitan.jpg' },
                ],
            }),
        });

        render(<HomePage />);

        await waitFor(() => {
            expect(screen.getByText('Cosmopolitan')).toBeInTheDocument();
        });

        expect(screen.queryByRole('button', { name: /add to favorites/i })).toBeNull();
    });
});
