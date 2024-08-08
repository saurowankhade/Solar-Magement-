import { useNavigate } from "react-router-dom"

const AcivityButton = () => {
    const navigator = useNavigate();
  return (
    <div className="flex justify-evenly mt-10 gap-3">
      <button onClick={()=>{
        navigator("/new-acivity")
      }} className="p-2 text-base w-full border sm:p-3 sm:text-lg rounded-full bg-green-900 text-white shadow-md ">New Acivity</button>
      <button onClick={()=>{
        navigator("/show-existing-acivity")
      }} className="p-2 text-base w-full border sm:p-3 sm:text-lg rounded-full bg-yellow-900 text-white shadow-md ">Existing Acivity</button>
    </div>
  )
}

export default AcivityButton
