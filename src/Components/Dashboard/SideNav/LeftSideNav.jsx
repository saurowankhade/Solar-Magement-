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
                    <svg
   width={18}
   height={18}
  viewBox="0 0 19 27"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M10.4288 1.3373C10.2599 1.17968 9.99904 1.17437 9.82283 1.32486L9.82194 1.32569C6.97658 3.76025 5.6463 7.19741 5.80721 11.7151L1.54397 15.6974C1.38815 15.8429 1.35666 16.0707 1.45386 16.2489L1.45548 16.2515L3.87745 20.6293C3.89357 20.659 3.9161 20.6903 3.94259 20.7187C4.11401 20.9022 4.40227 20.9118 4.58744 20.7397L6.9479 18.5348C7.06189 18.9495 7.17758 19.3652 7.30873 19.793C7.32756 19.8551 7.36188 19.9168 7.41115 19.9696C7.49686 20.0613 7.6121 20.1097 7.72937 20.1139L11.1664 20.2235C11.2828 20.2268 11.4008 20.1863 11.493 20.1002C11.5482 20.0486 11.5874 19.9871 11.6117 19.9212L11.6108 19.9238C11.7619 19.5131 11.909 19.1021 12.0521 18.6907L14.3194 21.118C14.3198 21.1184 14.3198 21.1184 14.3202 21.1188C14.4912 21.3019 14.7791 21.3111 14.9629 21.1393C14.9634 21.1389 14.9634 21.1389 14.9638 21.1385C14.9928 21.1115 15.0171 21.0821 15.0376 21.0505L15.0353 21.0535L17.7688 16.8401C17.8801 16.6656 17.8648 16.4359 17.7203 16.2812L13.7516 12.0325C14.2795 8.0434 13.6213 4.31146 10.4297 1.33819L10.4288 1.3373ZM4.39377 19.6755L2.42592 16.1186L5.88024 12.8919C6.01104 14.3377 6.26716 15.8622 6.63894 17.3642L6.68744 17.533L4.39377 19.6755ZM16.809 16.6443L14.588 20.0677L12.3807 17.7047C12.9297 16.0523 13.3106 14.5644 13.5931 13.0605L13.5687 13.1754L16.809 16.6443ZM10.8673 19.301L8.0868 19.2123C5.72339 11.3103 6.36778 5.78145 10.0572 2.33522L10.1039 2.29242C14.5266 6.73445 13.1305 13.0659 10.8673 19.301ZM8.76065 6.46628C8.08439 7.09797 8.04604 8.15555 8.67497 8.82886C9.30391 9.50217 10.3616 9.5359 11.0379 8.90421C11.7142 8.27252 11.7525 7.21495 11.1236 6.54164C10.4942 5.8696 9.4373 5.8359 8.76065 6.46628ZM10.4168 8.23932C10.1096 8.52627 9.62847 8.51092 9.34278 8.20507C9.05708 7.89922 9.07453 7.41812 9.38172 7.13117C9.68891 6.84423 10.1701 6.85958 10.4558 7.16543C10.741 7.47169 10.7236 7.95194 10.4168 8.23932ZM7.96918 22.1476L7.75643 22.3446C7.62642 22.5258 7.57211 22.6712 7.63936 22.8449L8.81919 25.8929C8.838 25.9434 8.86929 25.9939 8.9107 26.0382C9.08211 26.2217 9.37037 26.2313 9.55555 26.0592C9.60007 26.0176 9.63452 25.9688 9.65921 25.9167L9.65781 25.9197L11.0592 22.954C11.1325 22.7942 11.1123 22.6047 10.9964 22.4664L10.9956 22.4655C10.8377 22.2777 10.7048 22.1114 10.5904 21.9684C10.2086 21.49 9.95597 21.1732 9.54415 21.1429C9.08985 21.1099 8.76186 21.4129 7.96921 22.1467L7.96918 22.1476ZM9.87674 22.5395C9.94707 22.6282 10.024 22.7249 10.1101 22.8304L9.28733 24.5717L8.60182 22.8016C9.00238 22.4308 9.37667 22.0845 9.43662 22.0443C9.49327 22.0951 9.55598 22.1569 9.61685 22.222C9.71539 22.3275 9.80515 22.4379 9.88658 22.5527L9.87674 22.5395Z"
    fill="black"
    stroke="black"
  />
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

