import React from 'react'

import { useContext, useState } from "react";
import Loading from "react-loading";
import Swal from "sweetalert2";
import UserContext from '../../Context/UserContext/UserContext';
import { toast } from 'react-toastify';
import firestore from '../../Firebase/Firestore';

const BranchDetails = ({getData}) => {
    const { name, email, mobileNo, companyID } = getData;
    const [isLoading, setIsLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const {user} = useContext(UserContext);
    const handleRightButton = () => {
        setShowMore(false)
        if(user?.activeID === companyID){
            toast.info("Already has Priority!")
        } 
         else if(user?.jobProfile === 'Admin' && user?.verified ){
            Swal.fire({
                title: "Are you sure you want to make it a priority?",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: `No`, customClass: {
                  confirmButton: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
                  denyButton: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
                }
              }).then((result)=>{
                if(result.isConfirmed){
                    firestore.updateData("Users", {
                        activeID: companyID
                    }
                        , user?.userID)
                        .then((status) => {
                            if (status.status === 200) {
                                toast.success("Added!")
                            } else {
                                toast.error("Failed")
                            }
                            setIsLoading(false)
        
                        }).catch((error) => {
                            toast.error(error.message)
                        })
                }
              })

        } else{
            toast.error("Sorry, you can't prioritize it!")
        }
       
        
    }

    const handleDelete = () => {
        setShowMore(false)
        if(user?.activeID === companyID){
            toast.error("Sorry you can`t delete!");
        }
        else if(user?.isCmp === true ){
            Swal.fire({
                title: "Are you sure to delete?",
                text: "Once you delete, you will lose access to your branch company.",
                icon: "warning",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No",
                buttonsStyling: false, // Required for Tailwind to work
                 
                customClass: {
                    confirmButton: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2',
                    denyButton: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2',
                }
              }).then((result)=>{
                if(result.isConfirmed){
                    firestore.updateData("CompanyRegister", {
                        createBy:'',
                        previousCreateBy:user?.userID
                    }, companyID)
                        .then((status) => {
                            if (status.status === 200) {
                                toast.success("Removed!")
                            } else {
                                toast.error("Failed",status.message)
                            }
                            setIsLoading(false)
        
                        }).catch((error) => {
                            toast.error(error.message)
                        })

                        firestore.updateData("Users", {
                            activeID:''
                        }, user?.userID)
                            .then((status) => {
                                if (status.status === 200) {
                                    toast.success("Removed!")
                                } else {
                                    toast.error("Failed",status.message)
                                }
                                setIsLoading(false)
            
                            }).catch((error) => {
                                toast.error(error.message)
                            })
                }
              })

        } else{
            toast.error("Sorry you can`t delete!");
        }
    }
  return (
    <div className="border mt-3 w-full shadow-md p-3 flex flex-col gap-3 ">
    <div className="flex justify-between">
        <p>Company Name : {name} </p>
           
                <div className="flex ">
                   {
                    user?.activeID === companyID &&  ( 
                     <svg width="24" height="24" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_708_14)">
                        <path d="M56.4801 17.3696C56.1043 14.5177 54.5986 11.4652 52.0659 8.93317C49.5347 6.40184 46.4829 4.89623 43.6316 4.52048C42.3415 4.35005 40.6188 3.63755 39.5863 2.84501C37.3033 1.09439 34.0805 0 30.4999 0C26.9194 0 23.6965 1.09439 21.4136 2.84501C20.3811 3.63687 18.6583 4.35005 17.3683 4.52048C14.5169 4.89623 11.4652 6.40195 8.93386 8.93317C6.40116 11.4652 4.89543 14.5176 4.51979 17.3696C4.35005 18.6597 3.63687 20.3818 2.84501 21.4136C1.09382 23.6958 0 26.9194 0 30.4999C0 34.0805 1.09382 37.304 2.84501 39.5863C3.63755 40.6188 4.35005 42.3402 4.51979 43.63C4.89554 46.4821 6.40116 49.5347 8.93386 52.0665C11.4652 54.5979 14.5169 56.1037 17.3683 56.4793C18.6583 56.6496 20.3811 57.3628 21.4136 58.1547C23.6958 59.9053 26.9187 60.9998 30.4999 60.9998C34.0812 60.9998 37.3033 59.9053 39.5863 58.1547C40.6188 57.3628 42.3415 56.6496 43.6316 56.4793C46.4828 56.1035 49.5347 54.5978 52.0659 52.0665C54.5986 49.5346 56.1043 46.4821 56.4801 43.63C56.6497 42.3401 57.363 40.6181 58.1548 39.5863C59.9061 37.304 60.9999 34.0811 60.9999 30.4999C60.9999 26.9194 59.9061 23.6958 58.1548 21.4136C57.3623 20.3818 56.6497 18.6597 56.4801 17.3696ZM49.9396 20.5133L28.0223 42.4306L24.5155 45.9375C23.5469 46.9062 21.9772 46.9062 21.0087 45.9375L17.5019 42.4306L11.0595 35.9891C10.091 35.0204 10.091 33.4508 11.0595 32.4821L14.5663 28.9755C15.5349 28.0069 17.1046 28.0069 18.0732 28.9755L22.7614 33.6636L42.9254 13.4997C43.894 12.5312 45.4636 12.5312 46.4323 13.4997L49.939 17.0065C50.9081 17.975 50.9081 19.5455 49.9396 20.5133Z" fill="#F7AB0D" />
                    </g>
                    <defs>
                        <clipPath id="clip0_708_14">
                            <rect width="61" height="61" fill="white" />
                        </clipPath>
                    </defs>
                </svg>)
                   }

                    {/* More Options */}
                    <svg className="cursor-pointer" 
                    
                    onClick={()=>{
                        setShowMore((pre)=>!pre)
                    }}
                    
                    
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z" fill="#1D1B20" />
                    </svg>

                    {
                        showMore &&

                        <div
                            className={`absolute right-4 my-8  z-50   text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow  sm:right-1 md:right-4  lg:right-4 `}
                            id="user-dropdown"
                        >
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a onClick={() => {
                                        handleRightButton()
                                    }} className="flex cursor-pointer gap-2 items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_709_20)">
                                                <path d="M12 0C5.38308 0 0 5.38333 0 12C0 18.6167 5.38308 24 12 24C18.6169 24 24 18.6167 24 12C24 5.38333 18.6169 0 12 0ZM12 21.5573C6.73002 21.5573 2.44275 17.27 2.44275 12C2.44275 6.73002 6.73002 2.44275 12 2.44275C17.27 2.44275 21.5573 6.73002 21.5573 12C21.5573 17.27 17.27 21.5573 12 21.5573Z" fill="black" />
                                                <path d="M18.8816 8.06766L17.3486 6.53435C17.2406 6.42638 17.0488 6.42638 16.9411 6.53435L9.69055 13.7849L7.05922 11.1538C6.95149 11.0459 6.75998 11.0459 6.65177 11.1538L5.1187 12.6869C5.06447 12.7411 5.03418 12.8142 5.03418 12.8906C5.03418 12.9671 5.06447 13.0404 5.1187 13.0943L9.48682 17.4622C9.543 17.5182 9.61653 17.5467 9.69055 17.5467C9.76407 17.5467 9.83809 17.5187 9.89427 17.4622L18.8816 8.47487C18.9359 8.42088 18.9664 8.3476 18.9664 8.27114C18.9664 8.19468 18.9359 8.12164 18.8816 8.06766Z" fill="black" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_709_20">
                                                    <rect width="24" height="24" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <span>Priority</span>
                                    </a>
                                </li>

                                <li>
                                    <a onClick={() => {
                                        handleDelete();
                                    }} className="flex cursor-pointer gap-2 items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#1D1B20" />
                                        </svg>

                                        <span>Delete</span>
                                    </a>
                                </li>

                            </ul>
                        </div>

                    }

                </div>
    </div>
    <p>Company ID : {companyID}</p>
    <p>Email : {email}</p>
    <p>Mobile No : {mobileNo}</p>
</div>
  )
}

export default BranchDetails
