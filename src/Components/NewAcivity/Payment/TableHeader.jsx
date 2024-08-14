import { useEffect } from 'react'

const TableHeader = ({installamentData,setInstallamentData}) => {
    useEffect(()=>{
        console.log("Inst : ",installamentData);
        
    },[installamentData])

// Function to handle removal
const handleRemoveInstallment = (index) => {
    setInstallamentData((prevData) => 
      prevData.filter((_, i) => i !== index)
    );
  };
  return (
    <div className="relative overflow-x-auto shadow-sm border">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
        <thead className="text-xs text-gray-700 uppercase  border ">
            <tr>
                <th scope="col" className="px-6 py-3 font-bold">
                    Date
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                    Installaments
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                    Amount
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                    Medium
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                    Option
                </th>
            </tr>
        </thead>
        {
            installamentData.map((installament,index)=>(
                <tbody key={(installament?.Date).toString()+installament?.Amount+installament?.InstallmentNumber} className="">
            <tr className={`bg-white border-b `}>
            <td className={`px-6 py-4`}>
                    {(installament?.Date).toString().replace("India Standard Time","IST")}
                </td>
                <td className={`px-6 py-4`}>
                    {installament?.InstallmentNumber + " Installament"}
                </td>
                <td className={`px-6 py-4`}>
                    {installament?.Amount}
                </td>
                <td className={`px-6 py-4`}>
                    {installament?.PaymentMedium}
                </td>
                <td onClick={()=>{
                    handleRemoveInstallment(index)
                }} className={`px-6 py-4 cursor-pointer`}>
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

export default TableHeader
