import axios from "axios";
import { useEffect, useState } from "react";

const SearchInput = ({ getLocation, getPaginate }) => {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState(null)

    const searchLocation = (value) => {
        setSearch(value)
        {
            value == '' ? setFilter(null) :
                axios.get(`https://rickandmortyapi.com/api/location/?name=${value}`)
                    .then(res => {
                        setFilter(res.data.results)
                    }).catch(setFilter(null))
        }
    }

    const selectLocation = (id) => {
        getLocation(id)
        setSearch("")
        setFilter(null)
    }

    const validateKey = (e) => {
        if (e.key == 'Enter') {
            selectLocation(e.target.value)
        }
    }

    return (
        <div className="search-container">
            <div className="search-box">
                <input type="text" placeholder="Name or ID" value={search} onChange={(e) => { searchLocation(e.target.value) }} onKeyDown={(e) => { validateKey(e) }} />
                <button type="button" onClick={() => selectLocation(search)}>Search  by ID</button>
            </div>
            <div className="suggestions">
                <ul>
                    {filter !== null ? filter.map(location => {
                        return (
                            <li key={location.id} onClick={() => selectLocation(location.id)}>{location.name}</li>)
                    }) : ""}
                </ul>
            </div>
        </div>
    )
}

export default SearchInput;
