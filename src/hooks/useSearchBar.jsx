import { useRef } from "react"

export const useSearchBar = ({onSearch, onTextChange, idTechnology, idLocation, idExperienceLevel, initialText}) => {
    
  let timeOutIdRef = useRef (null)
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target.closest('form') || event.target
      const formData = new FormData (form)

      const filters = {
        technology: formData.get (idTechnology),
        location: formData.get (idLocation),
        experienceLevel: formData.get (idExperienceLevel)
        }
        onSearch(filters)
      }
    
  const handleInputChange = (event) => {
      const newText = event.target.value
      if (timeOutIdRef.current) {
        clearTimeout(timeOutIdRef.current)
      }
      timeOutIdRef.current = setTimeout(() => {
      onTextChange(newText)
      }, 500)
    }
    return {handleSubmit, handleInputChange, initialText}
}