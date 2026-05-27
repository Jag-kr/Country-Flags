import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://xcountries-backend.labs.crio.do/all')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setCountries(data)
        setError(null)
      } catch (err) {
        const errorMessage = `Error fetching data: ${err.message}`
        console.error(errorMessage)
        setError(errorMessage)
        setCountries([])
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  return (
    <div className="app-container">
      <h1>Country Flags</h1>
      
      {loading && <div className="loading">Loading countries...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && (
        <div className="flags-grid">
          {countries.map((country) => (
            <div key={country.cca2} className="flag-card">
              <img 
                src={country.flag} 
                alt={`${country.name} flag`}
                className="flag-image"
              />
              <h3 className="country-name">{country.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
