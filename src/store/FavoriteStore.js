import { create } from 'zustand';

export const useFavoriteStore = create((set) => ({
    favorites: [],

    setFavorites: (favorites) => set({ favorites }),
    
    fetchFavorites: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/favorites`, {
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to fetch favorites');
            const data = await response.json();
            const ids = data.data.map(job => job.id);
            set({ favorites: ids });
        } catch (error) {
            console.error('Error fetching favorites:', error);
            set({ favorites: [] });
        }
    },
    
    resetFavorites: () => set({ favorites: [] }),

    addFavorite: (jobId) => set((state) => ({ 
        favorites: state.favorites.includes(jobId) 
        ? state.favorites 
        : [...state.favorites, jobId] 
    })),
    
    removeFavorite: (jobId) => set((state) => ({
        favorites: state.favorites.filter((id) => id !== jobId)
    })),
}));