

const TableHeader = () => {
  return (
    <thead className="w-full text-base text-gray-700 uppercase bg-gray-50 border-b-2 sticky ">
            <tr>
                <th scope="col" className="py-3 px-3 text-center border sticky top-0 z-10 bg-gray-50">
                    Date
                </th>
                
                <th scope="col" className="py-3 text-center w-fit border sticky top-0 z-10 bg-gray-50">
                    Consumer Name
                </th>
                <th scope="col" className="py-3 text-center w-fit border sticky top-0 z-10 bg-gray-50">
                    Consumer Mobile No
                </th>
                <th scope="col" className="py-3 text-center w-fit border sticky top-0 z-10 bg-gray-50">
                    Consumer Number
                </th>
                <th scope="col" className="py-3 px-3 text-center border sticky top-0 z-10 bg-gray-50">
                    PV Application Number
                </th>
                <th scope="col" className="py-3 text-center w-fit border sticky top-0 z-10 bg-gray-50">
                    MNRE Registration Number
                </th>
                <th scope="col" className="py-3 text-center w-fit border sticky top-0 z-10 bg-gray-50">
                    Options
                </th>
            </tr>
        </thead>

  )
}

export default TableHeader
