

const PrimaryInfoMaterial = ({allData}) => {
    // const { trackSolarData } = useContext(TrackSolarContext);
    const { ConsumerName, ConsumerAddress, DriverName, Note, TeamName, VehicleName } = allData || {};
    const labelData = ["Team Name", "Consumer Name", "Consumer Address", "Driver Name", "Vehicle Name", "Note"];
    const valueData = [TeamName, ConsumerName, ConsumerAddress, DriverName, VehicleName, Note];
    return (
        <div className="flex justify-center `">
            <div className={`p-2  shadow-md border  w-[500px] `}>
                <h3 className="text-center text-xl underline">Main Data</h3>

                {
                    labelData.map((elements, index) => (
                        <div key={elements + index} className="mt-2">
                            <span className="text-base font-bold">{elements} : </span>
                            <span className="text-black">{valueData[index]}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PrimaryInfoMaterial