import { useState} from 'react'
import { Link } from 'react-router'

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
            <button className={styles.applyButton} onClick={handleApply}>{isApplied ? 'Applied' : 'Apply Now'}</button> :
            <Link to="/login" className={styles.applyButton}>Apply Now</Link>
        )
    }