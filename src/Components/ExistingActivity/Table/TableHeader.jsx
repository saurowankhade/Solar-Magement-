

const TableHeader = ({headerData}) => {
    // const headerData = ["Sr.No","Date","Consumer Name","Consumer Mobile No","Bill Unit","Consumer Number","PV Number","MNRE Number","Option"]
  return (
    <thead className="w-full text-base  text-gray-50 uppercase bg-black border-b-2 sticky shadow-md  ">
            <tr className="">
                {
                headerData.map((element,index)=>(
                    <th key={element+index} scope="col" className=" p-2 text-sm sm:text-base sm:py-3 text-center w-fit border sticky top-0 z-10 shadow-md bg-black text-gray-100">
                    {element}
                </th>
                ))
            }
            </tr>
        </thead>

  )
}

export default TableHeader
