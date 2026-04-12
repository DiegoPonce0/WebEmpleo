import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"

export function useFilters() {
  const RESULTS_PER_PAGE = 4
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState (() => {
    return {
      technology: searchParams.get ('technology') || '',
      location: searchParams.get ('location') || '',
      experienceLevel: searchParams.get ('level') || ''
    }
  })

  const [newText, setNewText] = useState (() => searchParams.get ('text') || '')

  const [currentPage, setCurrentPage] = useState(() => {
    const page = parseInt (searchParams.get ('page')) || 1
    return page
  })

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState (0)
  const [loading, setLoading] = useState (true)


  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading (true)

        const params = new URLSearchParams()
        if (newText) params.append ('text', newText)
        if (filters.technology) params.append ('technology', filters.technology)
        if (filters.location) params.append ('location', filters.location)
        if (filters.experienceLevel) params.append ('level', filters.experienceLevel)

        const offset = (currentPage -1) * RESULTS_PER_PAGE
        params.append ('limit', RESULTS_PER_PAGE)
        params.append ('offset', offset)

        const queryParams = params.toString()

        const response = await fetch (`${import.meta.env.VITE_API_URL}/jobs?${queryParams}`)
        const json = await response.json()
        setJobs (json.data)
        setTotal (json.total)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading (false)
      }
    }

    fetchJobs()
  }, [filters, newText, currentPage])

  useEffect (() => {
    setSearchParams ((params) => {
    if (newText) params.set('text', newText)
    if (filters.technology) params.set('technology', filters.technology)
    if (filters.location) params.set('location', filters.location)
    if (filters.experienceLevel) params.set('level', filters.experienceLevel)

    if (currentPage > 1) params.set('page', currentPage)

    return params
  })
  }, [newText, filters, currentPage, setSearchParams])

  const totalPages = Math.ceil (total / RESULTS_PER_PAGE)

  const handleSearch = (filters) => {
    setFilters (filters)
    setCurrentPage(1)
  }

  const handleTextChange = (newText) => {
    setNewText (newText)
    setCurrentPage(1)
  }

  return { jobs, loading, totalPages, handlePageChange, currentPage, handleSearch, handleTextChange, newText }
}