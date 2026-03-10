import { useState} from 'react'

import { useAuthStore } from '../store/AuthStore.js';
import styles from './ButtonApply.module.css'

export const ButtonApply = () => {
        const { isLoggedIn } = useAuthStore();
        const [isApplied, setIsApplied] = useState(false);

        const handleApply = () => {
            setIsApplied(true);
        }
        return (
            isLoggedIn ?
            <button className={styles.applyButton} onClick={handleApply}>{isApplied ? 'Aplicado' : 'Aplicar ahora'}</button> :
            <button disabled className={styles.applyButton}>Inicia sesión para aplicar</button>
        )
    }