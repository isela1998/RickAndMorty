import axios from "axios"
import { useEffect, useState } from "react"
import LocationInfo from "./components/LocationInfo"
import SearchInput from "./components/SearchInput"
import ResidentInfo from "./components/ResidentInfo"

function App() {
  const maxPages = 12
  const [pages, setPages] = useState([1])
  const [location, setLocation] = useState({})
  const [allResidents, setAllResidents] = useState([])
  const [residents, setResidents] = useState([])

  useEffect(() => {
    const locationRandom = Math.floor(Math.random() * 126) + 1
    axios.get(`https://rickandmortyapi.com/api/location/${locationRandom}/`)
      .then((res) => {
        setLocation(res.data)
        setAllResidents(res.data.residents)
        {
          res.data.residents.length > 12 ? getPaginate(res.data.residents) :
            setResidents(res.data.residents)
        }
      })
  }, [])

  useEffect(() => {
    next(0, 1)
  }, [location])

  const getPaginate = (residents) => {
    if (residents.length > 12) {
      const allPages = []
      const total = Math.ceil(residents.length / maxPages)
      for (let i = 1; i <= total; i++) {
        allPages.push(i)
      }
      setResidents([...allResidents].slice(0, maxPages))
      setPages(allPages)
    } else {
      setPages([1])
    }
  }

  const next = (index, page) => {
    setResidents([...allResidents].slice(index * maxPages, page * maxPages))
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  const getLocation = (id) => {
    {
      id <= 0 || id > 126 || isNaN(id) ?
        alert('No results, try again') :
        axios.get(`https://rickandmortyapi.com/api/location/${id}/`)
          .then((res) => {
            setLocation(res.data)
            setAllResidents(res.data.residents)
            {
              res.data.residents.length > 12 ? getPaginate(res.data.residents) :
                setResidents(res.data.residents)
            }
          })
    }
  }

  return (
    <div className="App">
      <div className="back-image"></div>
      <div className="container">
        <SearchInput getLocation={getLocation} getPaginate={getPaginate} />
        <LocationInfo location={location} />
        <div className="residents-group">
          {residents.map(url => {
            return (
              <ResidentInfo url={url} key={url} />
            )
          })}
        </div>
        <div className="page-buttons">
          {pages.map(page => {
            return (
              <div className="page" key={page} onClick={() => next(pages.indexOf(page), page)}>
                <b>{page}</b>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
