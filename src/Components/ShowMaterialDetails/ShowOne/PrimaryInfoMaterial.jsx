

const PrimaryInfoMaterial = ({allData}) => {
    // const { trackSolarData } = useContext(TrackSolarContext);
    const { ConsumerName, ConsumerAddress, DriverName, Note, VehicleName } = allData || {};
    const labelData = [ "Consumer Name", "Consumer Address", "Driver Name", "Vehicle Name", "Note"];
    const valueData = [ ConsumerName, ConsumerAddress, DriverName, VehicleName, Note];
    return (
        <div className="flex justify-center `">
            <div className={`p-2  shadow-md border mt-2 w-[700px] `}>
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