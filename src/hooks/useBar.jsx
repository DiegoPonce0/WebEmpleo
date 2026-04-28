import { useNavigate } from "react-router"

export const useBar = () => {
      const navigateTo = useNavigate()
    const handleSubmit = (event) => {
        
        event.preventDefault()
        const formData = new FormData(event.target)
        const searchQuery = formData.get('search')
        const url = `/search?text=${encodeURIComponent(searchQuery)}`

        navigateTo(url)
    }
    return {handleSubmit}
}