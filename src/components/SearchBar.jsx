import { useId } from "react"
import { useSearchBar } from "../hooks/useSearchBar"

export function SearchBar({ onSearch, onTextChange, initialText }) {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idExperienceLevel = useId()
  const {
    handleSubmit,
    handleInputChange,
  } = useSearchBar({ onSearch, onTextChange, idTechnology, idLocation, idExperienceLevel, initialText })



  return (
    <section className="jobs-search">
      <h1 style={{ textAlign: "center" }}>Find Your Next Job</h1>
      <p style={{ textAlign: "center" }}>Explore thousands of opportunities in the tech industry</p>
      <form id="empleos-search-form" role="search" onSubmit={handleSubmit} >

        <div className="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          <input
            type="text"
            placeholder="Search jobs by title, skill, or company"
            name={idText}
            onChange={handleInputChange}
            defaultValue={initialText}
          />
          <button type="submit">Search</button>
        </div>

        <div className="search-filters">
          <select name={idTechnology} id="filter-technology" onChange={handleSubmit}>
            <option value="">Technology</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="react">React</option>
            <option value="nodejs">Node.js</option>
            <hr />
            <option value="java">Java</option>
            <hr />
            <option value="csharp">C#</option>
            <option value="c">C</option>
            <option value="c++">C++</option>
            <hr />
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
          </select>

          <select name={idLocation} id="filter-location" onChange={handleSubmit}>
            <option value="">Location</option>
            <option value="remoto">Remote</option>
            <option value="vancouver">Vancouver</option>
            <option value="toronto">Toronto</option>
            <option value="calgary">Calgary</option>
            <option value="alberta">Alberta</option>
          </select>

          <select name={idExperienceLevel} id="filter-experience-level" onChange={handleSubmit}>
            <option value="">Experience Level</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </div>
      </form>

    </section>
  )
}