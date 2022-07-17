const LocationInfo = (location) => {
    const info = location.location

    return (
        <div>
            <div className="location-group">
                <div>
                    <div className="title-info">Name</div>
                    <div className="description-info">{info.name}</div>
                </div>
                <div>
                    <div className="title-info">Type</div>
                    <div className="description-info">{info.type}</div>
                </div>
                <div>
                    <div className="title-info">Dimension</div>
                    <div className="description-info">{info.dimension}</div>
                </div>
                <div>
                    <div className="title-info">Population</div>
                    <div className="description-info">{info.residents?.length}</div>
                </div>
            </div>
        </div>
    )
}

export default LocationInfo;