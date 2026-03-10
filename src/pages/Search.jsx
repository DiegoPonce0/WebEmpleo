import { JobListings } from "../components/JobListing"
import { Pagination } from "../components/Pagination"
import { SearchBar } from "../components/SearchBar"

import { useFilters } from "../hooks/useFilters"



export default function Search() {
  const {jobs, loading, totalPages, handlePageChange, currentPage, handleSearch, handleTextChange, newText} = useFilters()
  return (
    <main>
        <SearchBar initialText={newText} onSearch={handleSearch} onTextChange={handleTextChange} />
        <h2 style={{textAlign: "center"}}>Resultado de busqueda</h2>
            {loading ? <p>Cargando empleos...</p> : <JobListings jobs={jobs} currentPage={currentPage} />}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </main>
  )
}