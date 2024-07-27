
const TableBodyShimmerUI = () => {
    const loop = [0,1,2,3,4,5,6,7,8,9]
  return (
    <tbody className="w-full border-b">
        {
            loop.map((id)=>(
                <tr key={id}  className="bg-gray-50 mt-4  p-4  shadow  animate-pulse">
      <td className="px-6 py-6 border ">
         
      </td>
      <td className="px-6 py-6 border">
        
      </td>
      <td className="px-6 py-6 border">
        
      </td>
      <td className="px-6 py-6 border">
        
      </td>
      <td className="px-6 py-6 border">
        
      </td>
      <td className="px-6 py-6 border">
        
      </td>
      <td className="px-6 py-6 border">
        
      </td>
    </tr>
            ))
        }


  </tbody>
  )
}

export default TableBodyShimmerUI
