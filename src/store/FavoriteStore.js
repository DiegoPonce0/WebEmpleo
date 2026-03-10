import { create } from 'zustand';

export const useFavoriteStore = create((set, get) => ({
    favorites: [],

    addFavorite: (jobId) => set((state) => ({ 
        favorites: state.favorites.includes(jobId) 
        ? state.favorites 
        : [...state.favorites, jobId] 
    })),
    
    removeFavorite: (jobId) => set((state) => ({
        favorites: state.favorites.filter((id) => id !== jobId)
    })),
    
    isFavorite: (jobId) => {
        return get().favorites.includes(jobId);
    },

    toggleFavorite: (jobId) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        isFavorite(jobId) ? removeFavorite(jobId) : addFavorite(jobId);
    },

    countFavorites: () => {
        return get().favorites.length;
    }
}));