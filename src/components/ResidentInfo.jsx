import axios from "axios"
import { useEffect, useState } from "react"

const ResidentInfo = ({ url }) => {
    const [resident, setResident] = useState({})

    useEffect(() => {
        axios.get(url).then(res => setResident(res.data))
    }, [])

    return (
        <div className="box-residents">
            <div className="resident-img"><img src={resident.image} alt={resident.name} /></div>
            <div className="card-resident">
                <ul>
                    <li className="resident-name">{resident.name}</li>
                    <li className="titles"><small>STATUS</small></li>
                    <li className="resident-info">{resident.status}</li><br />
                    <li className="titles"><small>ORIGIN</small></li>
                    <li className="resident-info">{resident.origin?.name}</li><br />
                    <li className="titles"><small>EPISODES</small></li>
                    <li className="resident-info">{resident.episode?.length}</li>
                </ul>
            </div>
        </div>
    )
}

export default ResidentInfo;