import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../../Context/UserContext/UserContext";
import AllTrackContext from "../../../Context/AllTrackData/AllTrackContext";
import { useSearchParams } from "react-router-dom";
import firestore from "../../../Firebase/Firestore";
import TableBody from "../../ExistingActivity/Table/TableBody";
import TableBodyShimmerUI from "../../ExistingActivity/Table/TableBodyShimmerUI";
import TableHeader from "../../ExistingActivity/Table/TableHeader";


const ShowMaterial = () => {
  const headerData = ["Sr.No","Date","Consumer Name","Consumer Address","Team Name","Note","Options"]

  const [trackData, setTrackData] = useState([]);
  const [trackDataDoublicate, setTrackDataDoublicate] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  // const featchedLastData = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  const { allTrack } = useContext(AllTrackContext);

  const tableRef = useRef(null);


  const [searchParams, setSearchParam] = useSearchParams();

  // Retrieve values from query parameters
  const sortBy = searchParams.get('sortby');
  const isDone = searchParams.get('isdone') === 'true';
  const [selectedValue, setSelectedValue] = useState(''); // Track selected value
  const [selectedOptgroupLabel, setSelectedOptgroupLabel] = useState(''); // Track selected optgroup label

  useEffect(() => {
    
    if (sortBy && isDone) {
      setSelectedOptgroupLabel(sortBy);  // Set the label of the optgroup
      setSelectedValue(isDone);  // Set the selected value (true/false)
    }
  }, [isDone, searchParams, sortBy]); 

 
  // const { data } = useFirestoreDocuments("MaterialList");
  useEffect(() => {
    if (user?.activeID ) {
      firestore.getAllDocuments(user?.activeID+"MaterialList")
      .then((status)=>{
        
        setTrackData(status?.data)
        setTrackDataDoublicate(status?.data)
      })
    }
  }, [user])

  useEffect(() => {
    trackData[0] && setIsLoading(false);
    
  }, [trackData])

  // for search
  useEffect(() => {
    setTrackDataDoublicate(
      trackData.filter(item =>
        item?.ConsumerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.ConsumerAddress?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.TeamName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.Note?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        firestore.formatTimestamp(item?.Basic?.CreatedAt).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  }, [searchQuery, setSearchQuery, trackData])

  useEffect(() => {
    if(searchParams.size === 0){
      setTrackDataDoublicate(
        trackData.filter(item =>
          item?.ConsumerName
        )
      )
    }
    if (sortBy === "Structure") {
    if(isDone){
      setTrackDataDoublicate(
        trackData.filter(item =>
          item?.AddMaterial?.StructureMaterial?.isStructureMaterialDone === true
        )
      )
    } else{
      setTrackDataDoublicate(
        trackData.filter(item =>
          item?.AddMaterial?.StructureMaterial?.isStructureMaterialDone
        )
      )
    }
    }

    if (sortBy === "Electric Fitting") {
      if(isDone){
        setTrackDataDoublicate(
          trackData.filter(item =>
            item?.AddMaterial?.["Electric FittingMaterial"]?.["isElectric FittingMaterialDone"] === true
          )
        )
      } else{
        setTrackDataDoublicate(
          trackData.filter(item =>
            item?.AddMaterial?.["Electric FittingMaterial"]?.["isElectric FittingMaterialDone"]
          )
        )
      }
    }

    if (sortBy === "Concrete" ) {
     if(isDone){
      setTrackDataDoublicate(
        trackData.filter(item =>
          item?.AddMaterial?.ConcreteMaterial?.isConcreteMaterialDone === true
        )
      )
     } else{
      setTrackDataDoublicate(
        trackData.filter(item =>
          item?.AddMaterial?.ConcreteMaterial?.isConcreteMaterialDone
        )
      )
     }
    }


  }, [sortBy, isDone, trackData, searchParams.size])

  return (
    <div className="w-full mt-20">
    <div className=" bg-white sm:flex m-3  justify-between items-center">

      <div className="w-full">
        <input
          className="border border-[#111111] rounded-full p-2 w-full sm:w-[300px] placeholder:text-gray-950 "
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value) }} />
      </div>

      {/* Iner */}
      <div className="flex">

        <div className="flex  gap-2 w-[800px] justify-center items-center  p-1">
          <p>Sort by : {
            selectedOptgroupLabel ? selectedOptgroupLabel+" "+`${selectedValue === true ? 'Done' : 'Pending'}` : ''
            }</p>
          <select className="border text-base rounded-md p-1 gap-3" 
          onChange={(e) => {
            const selectedValue = e.target.value; // Get the value of the selected option
            const optgroupLabel = e.target.options[e.target.selectedIndex].parentNode.label; // Get the label of the parent <optgroup>
            const newParams = new URLSearchParams(searchParams);
            if (selectedValue === undefined || selectedValue === '' ||
              optgroupLabel === undefined || optgroupLabel === ''
            ) {
              // Clear the search parameters if selectedValue is undefined or empty
              setSearchParam({});
            } else {
              newParams.set('sortby', `${optgroupLabel}`);
              newParams.set('isdone', `${selectedValue}`);
              setSearchParam(newParams)
            }
            setSelectedOptgroupLabel(optgroupLabel);  // Update the optgroup label
            setSelectedValue(selectedValue);
          }} name="Filter" id="filter" >
            <option value="Select">Select...</option>
            <optgroup label="Structure">
              <option value="true">Done</option>
              <option value="false">Pending</option>
            </optgroup>
            <optgroup label="Electric Fitting">
              <option value="true">Done</option>
              <option value="false">Pending</option>
            </optgroup>
            <optgroup label="Concrete">
              <option value="true">Done</option>
              <option value="false">Pending</option>
            </optgroup>
          </select>
        </div>




      </div>

    </div>

    <div className=" max-h-screen h-screen overflow-y-auto ">

      {
        isLoading ?
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 border ">
            <TableHeader headerData={headerData} />
            <TableBodyShimmerUI />
          </table>
          :


          <table ref={tableRef} className="w-full text-sm text-left rtl:text-right text-gray-500 border h-[100px]  overflow-y-scroll ">

            <TableHeader headerData={headerData} />

            {
              trackDataDoublicate.length > 0 ?

                trackDataDoublicate.map((map, index) => (
                  <TableBody key={map?.id} getData={map} index={index + 1} collectionId={user?.activeID + "MaterialList"} />
                ))
                :
                <tbody className="w-full border-b">
                  <tr className="bg-gray-50 mt-2 cursor-pointer">
                    <th scope="row" colSpan="7" className="px-6 py-4 border text-center">
                      Oops !!! Data not found
                    </th>
                  </tr>
                </tbody>

            }
          </table>

      }
    </div>



  </div>
  )
}

export default ShowMaterial
