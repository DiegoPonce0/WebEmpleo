import { useState, useEffect } from "react"

import { ButtonFavorite } from "../components/ButtonFavorite.jsx"
import { ButtonApply } from "../components/ButtonApply.jsx"

import { useParams } from "react-router"
import { useNavigateHook } from "../hooks/useNavigate.jsx"
import styles from './Details.module.css'
import { Link } from "../components/Link.jsx"
import { JobSection } from "../components/JobSection.jsx"





export default function JobDetails() {
    const [job, setJob] = useState (null)
    const [loading, setLoading] = useState (true)
    const [error, setError] = useState (null)
    const { navigate } = useNavigateHook()
    const {id} = useParams()

    useEffect (() => {
        async function fetchJobDetails() {
            try {
                setLoading (true)
                const response = await fetch (`${import.meta.env.VITE_API_URL}/jobs/${id}`)
                if (!response.ok) {
                    throw new Error ('Error al obtener los detalles del empleo')
                }
                const data = await response.json()
                setJob(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchJobDetails()
    }, [id])


    if (loading) {
        return (<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
            <div className={styles.loading}>
                <p className={styles.loadingText}>Cargando...</p>
            </div>
        </div>)
    }
    if (error || !job) {
        return (<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div className={styles.error}>
          <h2 className={styles.errorTitle}>
            Oferta no encontrada
          </h2>
          <button
            onClick={() => navigate('/')}
            className={styles.errorButton}
          >
            Volver al inicio
          </button>
        </div>
      </div>)
    } 

    const BreadCrumbDetails = () => {
        return (
            <div className={styles.container}>
                <nav className={styles.breadcrumb}>
                    <Link 
                    href="/search"
                    className={styles.breadcrumbButton}
                    >
                    Empleos
                    </Link>
                    <span className={styles.breadcrumbSeparator}>/</span>
                    <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
                </nav>
            </div>
        )
    }



    const HeaderDetails = () => {
        return (
            <header className={styles.header}>
                <h1 className={styles.title}>
                {job.titulo}
                </h1>
                <p className={styles.meta}>
                {job.empresa} · {job.ubicacion}
                </p>
                <ButtonApply />
                <ButtonFavorite jobId={job.id} />
            </header>
        )
    }

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        
        <BreadCrumbDetails />

        <HeaderDetails />

        <JobSection title="Descripción del puesto" content={job.content.description} />
        <JobSection title="Responsabilidades" content={job.content.responsibilities} />
        <JobSection title="Requisitios" content={job.content.requirements} />
        <JobSection title="Acerca de la empresa" content={job.content.about} />

        <ButtonApply />
        <ButtonFavorite jobId={job.id} />
        </div>
    )
}