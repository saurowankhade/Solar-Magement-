

const TableHeader = () => {
  return (
    <thead className="w-full text-base  text-gray-50 uppercase bg-blue-900 border-b-2 sticky shadow-md  ">
            <tr className="">
                <th scope="col" className=" p-2 text-sm sm:text-base sm:py-3 sm:px-3 text-center border sticky top-0 z-10 shadow-md bg-blue-900 text-gray-100">
                    Date
                </th>
                
                <th scope="col" className=" p-2 text-sm sm:text-base sm:py-3 text-center w-fit border sticky top-0 z-10 shadow-md bg-blue-900 text-gray-100">
                    Consumer Name
                </th>
                <th scope="col" className=" p-2 text-sm sm:text-base sm:py-3 text-center w-fit border sticky top-0 z-10 shadow-md bg-blue-900 text-gray-100">
                    Consumer Mobile No
                </th>
                <th scope="col" className=" p-2 text-sm sm:text-base sm:py-3 text-center w-fit border sticky top-0 z-10 shadow-md bg-blue-900 text-gray-100">
                    Bill Unit
                </th>
                <th scope="col" className=" p-2 text-sm sm:text-base sm:py-3 text-center w-fit border sticky top-0 z-10 shadow-md bg-blue-900 text-gray-100">
                    Consumer Number
                </th>
                <th scope="col" className=" p-2 text-sm sm:text-base sm:py-3  text-center  sticky top-0 z-10 shadow-md bg-blue-900 text-gray-100">
                    PV Number
                </th>
                <th scope="col" className=" p-2 text-sm sm:text-base sm:py-3 text-center w-fit border sticky top-0 z-10 shadow-md bg-blue-900 text-gray-100">
                    MNRE Number
                </th>
                <th scope="col" className=" p-2 text-sm sm:text-base sm:py-3 text-center w-fit border sticky top-0 z-10 shadow-md bg-blue-900 text-gray-100">
                    Options
                </th>
            </tr>
        </thead>

  )
}

export default TableHeader
