import styles from './Pagination.module.css'

export function Pagination ({currentPage = 3, totalPages = 5, onPageChange}) {
    const pages = Array.from ({length: totalPages}, (_, i) => i + 1)
    
    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === totalPages

    const handlePageChange = (event) => {
        event.preventDefault()
        const page = Number (event.target.dataset.page)
        if (page !== currentPage){
            onPageChange(page)
        }
    }
    
    const handleNextPage = (event) => {
        event.preventDefault()
        if (isLastPage === false){
            onPageChange(currentPage + 1)
        }
    }

    const handlePrevPage = (event) => {
        event.preventDefault()
        if (isFirstPage === false){
            onPageChange(currentPage - 1)
        }
    }

  const buildPageUrl = (page) => {
    const url = new URL(window.location)
    url.searchParams.set('page', page)
    return `${url.pathname}?${url.searchParams.toString()}`
  }

    
    

    return (
        <nav className={styles.pagination}>
            <a href={buildPageUrl(currentPage - 1)} onClick={handlePrevPage}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 6l-6 6l6 6" />
                </svg>
            </a>

            {pages.map ((page) => 
            <a 
            href={buildPageUrl(page)} 
            data-page={page} 
            key={page} 
            onClick={handlePageChange} 
            className={currentPage === page ? styles.isActive : ''}
            >
                {page}
            
            </a>)}

            <a href={buildPageUrl(currentPage + 1)} onClick={handleNextPage}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 6l6 6l-6 6" />
                </svg>
            </a>
        </nav>
    )
}
    