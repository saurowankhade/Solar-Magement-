import { useParams } from "react-router-dom";
import PrimaryInfoMaterial from "./PrimaryInfoMaterial"
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../Context/UserContext/UserContext";
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import firestore from "../../../Firebase/Firestore";
import { toast } from "react-toastify";
import TableUi from "../../ShimmerUI/TableUi";
import MaterialStipper from "../../Stipper/MaterialStipper";
import Table from "../../MaterialComponent/MaterialInfo/Table";
import WhoAddData from "../../ExistingActivity/ShowSpecificAcivity/WhoAddData/WhoAddData";

const ShowOneList = () => {
  const { Id } = useParams();
  const { user } = useContext(UserContext);
  const { trackSolarData, setTrackSolarData } = useContext(TrackSolarContext);

  const [showPage, setShowPage] = useState(0);
  const [materialType, setMaterialType] = useState("AddMaterial");

  useEffect(() => {
    if (user?.activeID) {
      const companyID = user?.activeID;
      firestore.getOneData(companyID + "MaterialList", Id)
        .then((data) => {
          setTrackSolarData(data);
        }).catch((error) => {
          toast.error(error);
        })
    }
    return (() => {
      setTrackSolarData({});
    })

  }, [Id, user, setTrackSolarData])

  return (
    <div className="md:flex-col mt-20 ">
      {
        !trackSolarData?.ConsumerName ? <TableUi /> :
          <>





            <div className="sticky">
              <MaterialStipper showPage={showPage} setShowPage={setShowPage} />
            </div>

            
            <div className="flex mb-4 gap-2 justify-center items-center  p-1">
              <p>View Material</p>
              <select onChange={(e)=>{
                setMaterialType(e.target.value);
              }} className="border text-base rounded-md p-1 gap-3" >
                <option value="AddMaterial">AddMaterial</option>
                <option value="ReturnMaterial">ReturnMaterial</option>
                <option value="UsedMaterial">UsedMaterial</option> ReturnMaterial
              </select>
            </div>

            <div className=" flex-col md:w-full md:flex md:flex-col md:items-center md:mt-2">
              {
                showPage === 0 ? <div>
                  <WhoAddData user={trackSolarData?.Basic?.CreatedBy} date={trackSolarData?.Basic?.CreatedAt}/>
                  <PrimaryInfoMaterial allData={trackSolarData} />
                </div> :
                  showPage === 1 ?<div className="flex flex-col gap-2">
                  <WhoAddData user={trackSolarData?.[materialType]?.StructureMaterial?.createdBy} date={trackSolarData?.[materialType]?.StructureMaterial?.createdAt}/> 
                  <Table materialDetails={trackSolarData?.[materialType]?.StructureMaterial?.MaterialList || []} whichMaterial={"Structure Material"} isShow={true} />  </div> 
                  :
                    showPage === 2 ? 
                    <div className="flex flex-col gap-2">
                  <WhoAddData user={trackSolarData?.[materialType]?.["Electric FittingMaterial"]?.createdBy} date={trackSolarData?.[materialType]?.["Electric FittingMaterial"]?.createdAt}/>
                    <Table materialDetails={trackSolarData?.[materialType]?.["Electric FittingMaterial"]?.MaterialList || []} whichMaterial={"Electric Fitting Material"} isShow={true} /> 
                    </div> :
                      showPage === 3 ? 
                      <div className="flex flex-col gap-2">
                  <WhoAddData user={trackSolarData?.[materialType]?.ConcreteMaterial?.createdBy} date={trackSolarData?.[materialType]?.ConcreteMaterial?.createdAt}/>
                      <Table materialDetails={trackSolarData?.[materialType]?.ConcreteMaterial?.MaterialList || []} whichMaterial={"Concrete Material"} isShow={true} /> 
                      </div> : <></>
              }
            </div>
          </>
      }
    </div>
  )
}

export default ShowOneList
