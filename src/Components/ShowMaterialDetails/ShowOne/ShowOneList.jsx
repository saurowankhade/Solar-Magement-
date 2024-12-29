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

const ShowOneList = () => {
  const { Id } = useParams();
  const { user } = useContext(UserContext);
  const { trackSolarData, setTrackSolarData } = useContext(TrackSolarContext);

  const [showPage, setShowPage] = useState(0);
  const [materialType, setMaterialType] = useState("AddMaterial");

  useEffect(() => {
    if (user?.companyID) {
      const companyID = user?.companyID;
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
                <option value="RetrunMaterial">RetrunMaterial</option>
                <option value="UsedMaterial">UsedMaterial</option>
              </select>
            </div>

            <div className=" flex-col md:w-full md:flex md:flex-col md:items-center md:mt-2">
              {
                showPage === 0 ? <PrimaryInfoMaterial allData={trackSolarData} /> :
                  showPage === 1 ? <Table materialDetails={trackSolarData?.[materialType]?.StructureMaterial?.MaterialList || []} whichMaterial={"Structure Material"} isShow={true} /> :
                    showPage === 2 ? <Table materialDetails={trackSolarData?.[materialType]?.["Electric FittingMaterial"]?.MaterialList || []} whichMaterial={"Electric Fitting Material"} isShow={true} /> :
                      showPage === 3 ? <Table materialDetails={trackSolarData?.[materialType]?.ConcreteMaterial?.MaterialList || []} whichMaterial={"Concrete Material"} isShow={true} /> : <></>
              }
            </div>
          </>
      }
    </div>
  )
}

export default ShowOneList
