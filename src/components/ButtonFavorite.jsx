import { useFavoriteStore } from "../store/FavoriteStore.js"
import { useAuthStore } from "../store/AuthStore.js";


export function ButtonFavorite({jobId}) {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const addFavorite = useFavoriteStore(state => state.addFavorite)
    const removeFavorite = useFavoriteStore(state => state.removeFavorite)
    const favorite = useFavoriteStore(state => state.favorites.includes(jobId))
    const isLoading = useAuthStore(state => state.isLoading)

    const handleFavorite = async () => {

        try{

            if (isLoading) return null
            if (!isLoggedIn) return null

            if(!favorite){
                const response = await fetch(`${import.meta.env.VITE_API_URL}/favorites/${jobId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ jobId })
                })
                
                const data = await response.json()
                
                if (!response.ok) {
                    throw new Error(data.error)
                }

                addFavorite(jobId)
                
            } else {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/favorites/${jobId}`, {
                method: 'DELETE',
                credentials: 'include'
              })

                const data = await response.json()

                if(!response.ok) {
                    throw new Error(data.error)
                }

                removeFavorite(jobId)

            }

        } catch (error){
            console.error(error)
        }
    }

    return (
        isLoggedIn ?
            <button onClick={handleFavorite}>
                {favorite ? 'Remove Favorite' : 'Add Favorite'}
            </button> :
            null
        );
}