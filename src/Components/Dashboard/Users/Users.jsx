import { useContext, useEffect } from "react"
import ShowAllUserContext from "../../../Context/ShowAllUsersContext/ShowAllUserContext"
import { useNavigate } from "react-router-dom";

const Users = () => {
    const {allUser} = useContext(ShowAllUserContext);
    const navigate = useNavigate();
   
  return (
<div className=" scrollbar-custom md:w-[700px] overflow-x-auto overflow-y-auto h-[300px] rounded-md shadow-md border bg-white md:-mt-2 md:mr-5 mb-20 mt-4  md:mb-0 ">
<h1 className="font-bold font-sans px-4 py-4 text-base sm:text-lg">Users</h1>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
        <thead className="text-xs text-gray-700 uppercase  border sticky top-0 bg-white ">
            <tr>
                <th scope="col" className="px-6 py-3 font-bold">
                    Name
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                    Mobile No
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                    Email
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                    Job Profile
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                    Verified
                </th>
            </tr>
        </thead>
        {
            allUser.map((user)=>(
                <tbody onClick={()=>{
                    navigate("/dashboard/regitser-users");
                }} key={user?.userID} className="cursor-pointer">
            <tr className={`bg-white border-b `}>
            <td className={`px-6 py-4 ${user?.verified ? "" : " text-red-900"}`}>
                    {user?.name}
                </td>
                <td className={`px-6 py-4 ${user?.verified ? "" : " text-red-900"}`}>
                    {user?.mobileNo}
                </td>
                <td className={`px-6 py-4 ${user?.verified ? "" : " text-red-900"}`}>
                    {user?.email}
                </td>
                <td className={`px-6 py-4 ${user?.verified ? "" : " text-red-900"}`}>
                    {user?.jobProfile}
                </td>
                <td className={`px-6 py-4 ${user?.verified ? "" : " text-red-900"}`}>
                    {user?.verified ? "Yes" : "No"}
                </td>
            </tr> 
        </tbody>
            ))
        }
    </table>
</div>

  )
}

export default Users
