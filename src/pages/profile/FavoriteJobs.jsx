import { useEffect, useState } from 'react'
import { JobListings } from "../../components/JobListing"
import { useAuthStore } from '../../store/AuthStore'
import { useFavoriteStore } from '../../store/FavoriteStore'

import styles from './FavoriteJobs.module.css'

export default function FavoriteJobs() {
  
  const [favorites, setFavorites] = useState([])
  const user = useAuthStore(state => state.user)
  const favoriteIds = useFavoriteStore(state => state.favorites)
  

  useEffect(() => {
    
    if (!user) return;  

    async function fetchFavoriteJobs() {
        try {
          const response = await fetch (`${import.meta.env.VITE_API_URL}/favorites`, {
            credentials: 'include'
          })

          const json = await response.json()
          setFavorites (json.data)
        
        } catch (error) {
          console.error('Error fetching favorites jobs:', error)
        } 
      }

      fetchFavoriteJobs()
    }, [user, favoriteIds])

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Favorite Jobs</h1>
        <p className={styles.subtitle}>
          Latest jobs you have saved will appear here. You can track the status of your applications and manage your job search effectively.
        </p>

        {<JobListings jobs={favorites} />}
      </div>
    </main>
  )
}