import { useNavigate } from "react-router-dom"
import UserContext from "../../../Context/UserContext/UserContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import PopUp from "../../PopUp/PopUp";
import Swal from "sweetalert2";
import authentication from "../../../Firebase/authentication";
import { setItem } from "../../../utils/LocalStorage/localAuth";

const LeftSideNav = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const handleNavigate = (path) => (e) => {
        if(!user?.verified){
            e.stopPropagation();
        } else{
            navigate(path);
        }
      };

      const handleSignOut = ()=>{
        Swal.fire({
            title: "Do you want to sign out?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`,
            customClass: {
                confirmButton: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
                denyButton: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
              }
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                authentication.signout().then((status)=>{
                    if(status.status === 200){
                      setItem("isLogin",{isLogin:false,userID:""})
                      toast.success("Sign out",{position:'top-center'})
                      navigate("/user-signin")
                    }
                  })
            } 
          });
      }
    return (
        <div onClick={()=>{
            if(!user?.verified){
                toast.dismiss()
                toast.info("You are not verified yet!",{position:'top-center'})
              }
        }} className="flex flex-col space-y-6 md:p-4 bg-gray-200 rounded-md md:w-[300px] w-full md:m-2 max-h-full overflow-hidden fixed md:top-[70px] bottom-0 justify-around z-999 ">
            {/* Project Entry Section */}
            <div className="md:flex md:flex-col bg-white h-fit rounded-lg  md:p-4 md:space-y-4 shadow-md justify-between grid grid-cols-5 w-full p-1">
                {/* Project Entry */}
                <div onClick={handleNavigate('/dashboard/new-acivity')} className="flex md:border-b flex-col items-center md:flex-row md:items-center md:py-2  justify-center md:justify-normal group cursor-pointer">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.9706  1.43407C18.9548 1.20358 18.7678 1.02161 18.5363 1.0113H18.535C14.7938 0.848132 11.4755 2.45187 8.50918 5.86316H2.67534C2.46212 5.86316 2.28362 6.00812 2.23305 6.20465L2.23244 6.20768L1.01401 11.0602C1.00548 11.0929 1.00061 11.1311 1.00061 11.1699C1.00061 11.4211 1.2047 11.6249 1.45752 11.6255H4.68758C4.48776 12.0064 4.28854 12.3891 4.09238 12.7913C4.06374 12.8495 4.04668 12.918 4.04668 12.9902C4.04668 13.1158 4.09786 13.2298 4.18071 13.3129L6.61757 15.7391C6.70042 15.821 6.81435 15.872 6.94046 15.872C7.016 15.872 7.08667 15.8538 7.14942 15.8222L7.14698 15.8235C7.53769 15.6265 7.92576 15.4266 8.31119 15.2236V18.5451C8.31119 18.5457 8.31119 18.5457 8.31119 18.5463C8.31119 18.7968 8.51528 19 8.76688 19C8.76749 19 8.76749 19 8.7681 19C8.8077 19 8.84547 18.9951 8.88202 18.986L8.87837 18.9867L13.7521 17.7735C13.9525 17.722 14.0981 17.5437 14.0981 17.332L14.0981 11.5181C17.2069 8.96328 19.2734 5.78673 18.9706 1.43528V1.43407ZM2.04237 10.7156L3.03234 6.773H7.75924C6.86796 7.91878 6.01445 9.20772 5.26085 10.5591L5.18104 10.7156H2.04237ZM13.1843 16.9753L9.2244 17.961L9.2244 14.7274C10.7535 13.8946 12.0475 13.0673 13.2806 12.1611L13.1843 12.2284V16.9753ZM7.02879 14.8608L5.05737 12.898C8.72424 5.51014 12.9692 1.90961 18.0178 1.90961L18.0812 1.91022C18.281 8.17536 12.9388 11.8493 7.02879 14.8608ZM14.2504 4.04348C13.325 4.04348 12.5751 4.79016 12.5751 5.71152C12.5751 6.63288 13.325 7.37955 14.2504 7.37955C15.1758 7.37955 15.9258 6.63288 15.9258 5.71152C15.9245 4.79076 15.1752 4.0447 14.2504 4.04348ZM14.2504 6.46972C13.8301 6.46972 13.4889 6.13004 13.4889 5.71152C13.4889 5.29299 13.8301 4.95332 14.2504 4.95332C14.6708 4.95332 15.0119 5.29299 15.0119 5.71152C15.0113 6.13004 14.6708 6.46911 14.2504 6.46972ZM2.96776 14.9627L2.67778 14.9615C2.45907 15.0052 2.32017 15.0744 2.25072 15.2472L1.03229 18.28C1.01158 18.3298 1 18.388 1 18.4486C1 18.6998 1.20409 18.9036 1.45691 18.9042C1.51783 18.9042 1.57632 18.892 1.62993 18.8708L1.62688 18.872L4.67539 17.6613C4.83805 17.5946 4.95259 17.4424 4.96233 17.2622V17.261C4.97513 17.0159 4.99158 16.8037 5.00559 16.6211C5.05311 16.0109 5.08479 15.6069 4.80455 15.3036C4.49507 14.9694 4.04851 14.967 2.96837 14.9621L2.96776 14.9627ZM4.0942 16.5513C4.08506 16.6641 4.07532 16.7873 4.06618 16.9231L2.27631 17.634L2.9836 15.8726C3.52946 15.875 4.03937 15.8774 4.11065 15.889C4.11735 15.9648 4.12101 16.0527 4.12101 16.1419C4.12101 16.2863 4.11126 16.4282 4.09238 16.5677L4.0942 16.5513Z" fill="black" stroke="black"/>
</svg>



                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                        <span className="text-[8px] font-semibold md:font-normal md:text-base text-center md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Project Initiation</span>
                    </div>
                </div>

                {/* Project overview */}

                <div onClick={handleNavigate('/dashboard/show-existing-acivity')} className="flex flex-col items-center md:flex-row md:items-center md:py-2  justify-center md:justify-normal group cursor-pointer">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg
  width={18}
  height={18}
  viewBox="0 0 18 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M1.8 0.9C1.8 0.661305 1.70518 0.432387 1.5364 0.263604C1.36761 0.0948211 1.13869 0 0.9 0C0.661305 0 0.432387 0.0948211 0.263604 0.263604C0.0948211 0.432387 0 0.661305 0 0.9V16.38C0 16.8097 0.170678 17.2217 0.474487 17.5255C0.778296 17.8293 1.19035 18 1.62 18H17.1C17.3387 18 17.5676 17.9052 17.7364 17.7364C17.9052 17.5676 18 17.3387 18 17.1C18 16.8613 17.9052 16.6324 17.7364 16.4636C17.5676 16.2948 17.3387 16.2 17.1 16.2H1.8V0.9ZM17.7363 5.1363C17.9002 4.96656 17.991 4.73922 17.9889 4.50324C17.9869 4.26726 17.8922 4.04153 17.7253 3.87466C17.5585 3.7078 17.3327 3.61314 17.0968 3.61109C16.8608 3.60904 16.6334 3.69976 16.4637 3.8637L10.8 9.5274L7.8363 6.5637C7.66752 6.39498 7.43865 6.30019 7.2 6.30019C6.96135 6.30019 6.73247 6.39498 6.5637 6.5637L2.9637 10.1637C2.87774 10.2467 2.80918 10.346 2.76201 10.4558C2.71484 10.5656 2.69001 10.6837 2.68897 10.8032C2.68794 10.9227 2.71071 11.0413 2.75596 11.1519C2.80121 11.2625 2.86804 11.363 2.95254 11.4475C3.03705 11.532 3.13753 11.5988 3.24814 11.644C3.35875 11.6893 3.47726 11.7121 3.59676 11.711C3.71626 11.71 3.83436 11.6852 3.94416 11.638C4.05397 11.5908 4.15328 11.5223 4.2363 11.4363L7.2 8.4726L10.1637 11.4363C10.3325 11.605 10.5614 11.6998 10.8 11.6998C11.0386 11.6998 11.2675 11.605 11.4363 11.4363L17.7363 5.1363Z"
    fill="black"
  />
</svg>



                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                        <span className="text-[8px] font-semibold md:text-base text-center md:font-normal md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Project Insights</span>
                    </div>
                </div>

                {/* Material entry */}

                <div onClick={handleNavigate('/dashboard/material-entry')} className="flex flex-col items-center md:flex-row md:items-center md:py-1  justify-center md:justify-normal cursor-pointer group">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg
  width={18}
  height={18}
  viewBox="0 0 18 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <mask
    id="mask0_20_12"
    style={{ maskType: "luminance" }}
    maskUnits="userSpaceOnUse"
    x={0}
    y={0}
    width={18}
    height={18}
  >
    <path d="M18 0H0V18H18V0Z" fill="white" />
  </mask>
  <g mask="url(#mask0_20_12)">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.5 0.75C1.5 0.335786 1.16421 0 0.75 0C0.335786 0 0 0.335786 0 0.75V17.25C0 17.6642 0.335786 18 0.75 18C1.16421 18 1.5 17.6642 1.5 17.25V16.5H16.5V17.25C16.5 17.6642 16.8358 18 17.25 18C17.6642 18 18 17.6642 18 17.25V0.75C18 0.335786 17.6642 0 17.25 0C16.8358 0 16.5 0.335786 16.5 0.75V6H15V2.25C15 1.83579 14.6642 1.5 14.25 1.5H8.25C7.83578 1.5 7.5 1.83579 7.5 2.25V3H3.75C3.33579 3 3 3.33579 3 3.75V6H1.5V0.75ZM7.5 4.5H4.5V6H7.5V4.5ZM1.5 7.5V15H3V9.75C3 9.33578 3.33579 9 3.75 9H9.75C10.1642 9 10.5 9.33578 10.5 9.75V10.5H14.25C14.6642 10.5 15 10.8358 15 11.25V15H16.5V7.5H1.5ZM13.5 6V3H9V6H13.5ZM9 15H4.5V10.5H9V15ZM10.5 15V12H13.5V15H10.5Z"
      fill="black"
    />
  </g>
</svg>



                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                        <span className="text-[8px] font-semibold md:text-base text-center md:font-normal md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Material Entry</span>
                    </div>
                </div>

                {/* Material overview */}

                <div onClick={handleNavigate('/dashboard/material-overview')} className="flex flex-col items-center md:flex-row md:items-center md:py-1  justify-center md:justify-normal group cursor-pointer">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg
  width={18}
  height={18}
  viewBox="0 0 18 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M17.7 11.07L14.925 2.07C14.475 0.9 13.5 0 12.375 0C10.95 0 9.75 1.44 9.75 3.15V3.6H8.25V3.15C8.25 1.44 7.05 0 5.625 0C4.5 0 3.525 0.9 3.15 2.16L0.375 11.16C0.15 11.7 0 12.33 0 13.05C0 15.75 1.875 18 4.125 18C6.3 18 8.025 16.02 8.25 13.5H9.75C9.975 16.02 11.7 18 13.875 18C16.125 18 18 15.75 18 13.05C18 12.33 17.85 11.7 17.7 11.07ZM4.125 16.2C2.7 16.2 1.5 14.76 1.5 13.05C1.5 11.34 2.7 9.9 4.125 9.9C5.55 9.9 6.75 11.34 6.75 13.05C6.75 14.76 5.55 16.2 4.125 16.2ZM6.75 5.94V9.18C6 8.55 5.1 8.1 4.125 8.1C3.675 8.1 3.225 8.19 2.775 8.37L4.35 3.42L4.575 2.79C4.65 2.52 4.8 2.25 4.95 2.07C5.025 1.98 5.1 1.89 5.25 1.89C5.25 1.89 5.25 1.89 5.325 1.89C5.4 1.8 5.475 1.8 5.625 1.8C6.225 1.8 6.75 2.43 6.75 3.15V5.94ZM9.75 5.4V11.7H8.25V5.4H9.75ZM11.25 5.94V3.15C11.25 2.43 11.775 1.8 12.375 1.8C12.525 1.8 12.6 1.8 12.675 1.89C12.675 1.89 12.675 1.89 12.75 1.89C12.825 1.89 12.975 1.98 13.05 2.07C13.2 2.25 13.35 2.52 13.425 2.79L13.65 3.42L15.225 8.37C14.775 8.19 14.325 8.1 13.875 8.1C12.9 8.1 12 8.55 11.25 9.27V5.94ZM13.875 16.2C12.45 16.2 11.25 14.76 11.25 13.05C11.25 11.34 12.45 9.9 13.875 9.9C15.3 9.9 16.5 11.34 16.5 13.05C16.5 14.76 15.3 16.2 13.875 16.2Z"
    fill="black"
  />
</svg>


                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                        <span className="text-[8px] font-semibold md:text-base text-center md:font-normal md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Material Overview</span>
                    </div>
                </div>

                {/* Libary */}
                <div onClick={
                  handleNavigate('/dashboard/library')
                  } className="flex  flex-col items-center md:flex-row md:items-center md:py-1  justify-center md:justify-normal group cursor-pointer">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg
  width={20}
  height={20}
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M14.5 3.25L19 19"
    stroke="black"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M10 3.25V19"
    stroke="black"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M5.5 5.5V19"
    stroke="black"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M1 1V19"
    stroke="black"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>



                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                        <span className="text-[8px] font-semibold md:text-base text-center md:font-normal md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Library</span>
                    </div>
                </div>



                {/* Menu Items */}


            </div>

            {/* Color Legend Section */}
            <div className="bg-white rounded-lg p-4 space-y-4 shadow-md text-sm text-gray-700 hidden md:block">
                {/* All Users */}

                <div onClick={() => {
                    navigate('/dashboard/regitser-users');
                }} className="flex flex-col items-center md:flex-row md:items-center md:py-1  justify-center md:justify-normal group cursor-pointer ">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg
  width={20}
  height={20}
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M11 19V16.75C11 13.6434 8.7614 11.125 6 11.125C3.23858 11.125 1 13.6434 1 16.75V19H11ZM11 19H19V17.875C19 14.5613 16.7614 12.25 14 12.25C12.5867 12.25 11.3103 12.9537 10.4009 14.085M9 4.375C9 6.23896 7.65685 7.75 6 7.75C4.34315 7.75 3 6.23896 3 4.375C3 2.51104 4.34315 1 6 1C7.65685 1 9 2.51104 9 4.375ZM16 6.625C16 7.86767 15.1046 8.875 14 8.875C12.8954 8.875 12 7.86767 12 6.625C12 5.38236 12.8954 4.375 14 4.375C15.1046 4.375 16 5.38236 16 6.625Z"
    stroke="black"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>



                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1 text-black">
                        <span className="text-[8px] font-semibold md:text-base text-center md:font-normal md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Users</span>
                    </div>
                </div>
                {/* Branches */}

                {
                    user?.isCmp && (
                        <div onClick={()=>{
                            navigate('/dashboard/branches')
                        }} className="flex flex-col items-center md:flex-row md:items-center md:py-1  justify-center md:justify-normal group cursor-pointer">
                            {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 2V14M5 14C3.34315 14 2 15.3431 2 17C2 18.6569 3.34315 20 5 20C6.65685 20 8 18.6569 8 17M5 14C6.65685 14 8 15.3431 8 17M17 8C18.6569 8 20 6.65685 20 5C20 3.34315 18.6569 2 17 2C15.3431 2 14 3.34315 14 5C14 6.65685 15.3431 8 17 8ZM17 8C17 10.3869 16.0518 12.6761 14.364 14.364C12.6761 16.0518 10.3869 17 8 17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

        
                            <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                                <span className=" text-black text-[8px] font-semibold md:text-base text-center md:font-normal md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Branch</span>
                            </div>
                        </div>
                    )
                }
              
                {/* Profile */}

                <div onClick={() => {
                    navigate('/dashboard/profile');
                }} className="flex flex-col items-center md:flex-row md:items-center md:py-1  justify-center md:justify-normal group cursor-pointer">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg
  width={18}
  height={18}
  viewBox="0 0 18 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M12.6748 5.39999C12.6748 3.41459 11.0267 1.79999 9.00002 1.79999C6.97336 1.79999 5.3252 3.41459 5.3252 5.39999C5.3252 7.3854 6.97336 8.99999 9.00002 8.99999C11.0267 8.99999 12.6748 7.3854 12.6748 5.39999ZM16.1512 18H14.5122C14.0051 18 13.5935 17.5968 13.5935 17.1C13.5935 16.6032 14.0051 16.2 14.5122 16.2H14.9064C15.5421 16.2 16.0116 15.5727 15.7709 14.9958C14.6583 12.3282 12.0455 10.8 9.00002 10.8C5.95452 10.8 3.34172 12.3282 2.22917 14.9958C1.98847 15.5727 2.45794 16.2 3.09368 16.2H3.48779C3.99491 16.2 4.40649 16.6032 4.40649 17.1C4.40649 17.5968 3.99491 18 3.48779 18H1.84882C0.700441 18 -0.203564 16.9713 0.0398925 15.8724C0.708708 12.8493 2.79694 10.6182 5.54754 9.60567C4.29259 8.61657 3.48779 7.101 3.48779 5.39999C3.48779 2.20409 6.32109 -0.342921 9.66057 0.0377792C12.0804 0.313179 14.085 2.20224 14.4479 4.56294C14.7603 6.59785 13.9105 8.45637 12.4525 9.60567C15.2031 10.6182 17.2913 12.8493 17.9601 15.8724C18.2036 16.9713 17.2996 18 16.1512 18ZM11.7561 17.1C11.7561 17.5968 11.3446 18 10.8374 18H7.16261C6.65548 18 6.2439 17.5968 6.2439 17.1C6.2439 16.6032 6.65548 16.2 7.16261 16.2H10.8374C11.3446 16.2 11.7561 16.6032 11.7561 17.1Z"
    fill="black"
  />
</svg>


                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                        <span className="text-black text-[8px] font-semibold md:text-base text-center md:font-normal md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Profile</span>
                    </div>
                </div>

                {/* Sign out */}

                <div 
                onClick={handleSignOut}
                 className="flex flex-col items-center md:flex-row md:items-center md:py-1  justify-center md:justify-normal group cursor-pointer">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg
  width={20}
  height={20}
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M8.87451 7.76355L11.1244 10.0008L8.87451 12.2633"
    stroke="black"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M11.1246 10.0007H2.125"
    stroke="black"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02943 14.9706 1 10 1C5.02943 1 1 5.02943 1 10C1 14.9706 5.02943 19 10 19Z"
    stroke="black"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                        <span className=" text-black text-[8px] font-semibold md:text-base text-center md:font-normal md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Sign Out</span>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default LeftSideNav

