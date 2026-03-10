import { useFavoriteStore } from "../store/FavoriteStore.js"
import { useAuthStore } from "../store/AuthStore.js";
export function ButtonFavorite({jobId}) {
    const { isLoggedIn } = useAuthStore();
    const { toggleFavorite, isFavorite } = useFavoriteStore();

    return (
        isLoggedIn ?
            <button onClick={() => toggleFavorite(jobId)}>
                {isFavorite(jobId) ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
            </button> :
            null
        );
}