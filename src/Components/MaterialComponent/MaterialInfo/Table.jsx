const Table = ({materialDetails,setMaterialDetails, isShow}) => {
    const removeElement = (index)=>{
        setMaterialDetails((prevData) => 
            prevData.filter((_, i) => i !== index)
          );
    }

  return (
    <div className="relative overflow-x-auto shadow-sm border">
    <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 border">
        <thead className="text-xs text-gray-700 uppercase  border ">
            <tr>
                <th scope="col" className="px-6 py-3 font-bold">
                    Material
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                    Unit
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                    Quantity
                </th>
                <th scope="col" className={`px-6 py-3 font-bold ${isShow === true ? "hidden" : ''} `}>
                    Option
                </th>
            </tr>
        </thead>
        {
            materialDetails.map((material,index)=>(
                <tbody key={`${material+index}`} className="">
            <tr className={`bg-white border-b `}>
            <td className={`px-6 py-4`}>
                    {material?.Material}
                </td>
                <td className={`px-6 py-4`}>
                    {material?.Unit}
                </td>
                <td className={`px-6 py-4`}>
                    {material?.Quantity}
                </td>
                <td  onClick={()=>{
                    removeElement(index)
                }} className={`px-6 py-4 cursor-pointer ${isShow === true ? "hidden" : ''}`}>
                    ❌
                </td>
            </tr> 
        </tbody>
            ))
        }
    </table>
</div>
  )
}

export default Table
