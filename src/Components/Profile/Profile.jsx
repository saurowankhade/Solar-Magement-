import { useContext, useState } from "react";
import UserContext from "../../Context/UserContext/UserContext";
import { toast } from "react-toastify";
import firestore from "../../Firebase/Firestore";

import ReactLoading from 'react-loading';
import CompanyRegister from "../NewCompanyRegister/CompanyRegister";

const Profile = () => {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [showCompany, setShowCompany] = useState(false);
    // const [showCelebration, setShowCelebration] = useState(false);
    
    const handleActiveId = (e) => {
        setIsLoading(true)
        firestore.updateData("Users", {
            activeID: e.target.value
        }, user?.userID)
            .then((status) => {
                if (status.status === 200) {
                    toast.success("Added!")
                } else {
                    toast.error(status.message)
                }
                setIsLoading(false)
            }).catch((e) => {
                console.log(e);

            })
    }

    return (
        <div className={`${showCompany ? ' mt-0' : ' mt-32'}`}>
            <div>
                <CompanyRegister showCompany={showCompany} setShowCompany={setShowCompany} />
                
            </div>

            <div className="mt-0">
                <div className={`max-w-lg mx-auto p-6 bg-white shadow-md rounded-md`}>
                    <h1 className="text-2xl text-center font-bold mb-4">Profile</h1>
                    <div className="mb-4 flex border gap-6 items-center rounded-full bg-[#fafafa] p-2">
                        <svg className=" ml-2 w-4 h-4 " viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 11C16.5376 11 19 8.76142 19 6C19 3.23858 16.5376 1 13.5 1C10.4624 1 8 3.23858 8 6C8 8.76142 10.4624 11 13.5 11Z" stroke="black" strokeWidth="2" />
                            <path d="M25 20C25 22.7614 25 25 13 25C1 25 1 22.7614 1 20C1 17.2386 6.37258 15 13 15C19.6275 15 25 17.2386 25 20Z" stroke="black" strokeWidth="2" />
                        </svg>

                        <p className="text-gray-700 text-base  font-semibold">Name : </p>
                        <p className="text-gray-800 text-base ">{user?.name || "N/A"}</p>
                    </div>

                    <div className="mb-4 flex border gap-6 items-center rounded-full bg-[#fafafa] p-2">

                        <svg className=" ml-2 w-4 h-4 " viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.33325 4.42867L10.5999 12.4C12.0222 13.7714 13.9777 13.7714 15.3999 12.4L23.6666 4.42859" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22.3333 1H3.66667C2.19391 1 1 2.53502 1 4.42857V21.5714C1 23.465 2.19391 25 3.66667 25H22.3333C23.8061 25 25 23.465 25 21.5714V4.42857C25 2.53502 23.8061 1 22.3333 1Z" stroke="black" strokeWidth="2" strokeLinecap="round" />
                        </svg>




                        <p className="text-gray-700 text-base  font-semibold">Email : </p>
                        <p className="text-gray-800 text-base ">{user?.email || "N/A"}</p>
                    </div>

                    <div className="mb-4 flex border gap-6 items-center rounded-full bg-[#fafafa] p-2">
                        <svg className=" ml-2 w-4 h-4 " viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.85653 14.0187L7.89201 9.11552C8.30381 8.58753 8.50972 8.32352 8.61763 8.02744C8.71311 7.76545 8.75261 7.48645 8.73361 7.20833C8.71213 6.89404 8.58756 6.58351 8.33845 5.96245L7.3882 3.59347C7.01954 2.67439 6.8352 2.21484 6.51722 1.91363C6.23701 1.6482 5.88588 1.46917 5.50605 1.39805C5.07499 1.31733 4.59348 1.43739 3.63046 1.67747L1 2.33333C1 15.6667 10.3591 25 23.7302 25L24.3875 22.3765C24.6283 21.4161 24.7486 20.936 24.6677 20.5061C24.5963 20.1275 24.4169 19.7772 24.1507 19.4979C23.8487 19.1807 23.3878 18.9969 22.4661 18.6293L20.3462 17.7836C19.6357 17.5003 19.2804 17.3585 18.9262 17.3477C18.6131 17.3381 18.3022 17.4017 18.0182 17.5335C17.6969 17.6827 17.4264 17.9524 16.8853 18.492L12.8028 22.5644M14.3703 6.33333C15.6763 6.58743 16.8765 7.22435 17.8174 8.16259C18.7583 9.10081 19.397 10.2977 19.6517 11.6M14.3703 1C17.0836 1.30059 19.6137 2.51223 21.5454 4.43601C23.4769 6.35979 24.6951 8.88135 25 11.5867" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <p className="text-gray-700 text-base font-semibold">Mobile No : </p>
                        <p className="text-gray-800 text-base ">{user?.mobileNo || "N/A"}</p>
                    </div>

                    {user?.isCmp ?
                        <div className="w-full justify-center my-2">
                            <div className=" border rounded-full flex items-center py-2 gap-1 px-2 justify-between  ">
                                <div className="text-base px-1">Company ID :</div>
                                <select className="outline-none cursor-pointer text-base w-[100px] sm:w-fit" name="documents" id="documents" value={user?.activeID} onChange={(e) => { handleActiveId(e) }}  >
                                    {
                                        user?.companyID.map((document) => (
                                            <option className="cursor-pointer" key={document} value={document}>
                                                {document}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        :

                        <div className="mb-4">
                            <h2 className="text-gray-700 font-semibold">Company ID</h2>
                            <p className="text-gray-800">{user?.companyID || "N/A"}</p>
                        </div>

                    }


                    {
                        user?.isCmp && (
                            <div className="flex flex-col items-center">
                                {
                                    isLoading ? <ReactLoading type='spinningBubbles' color='#000' height={'10%'} width={'10%'} /> :

                                        <button
                                            className="bg-black flex gap-2 text-white px-4 py-2 rounded-md hover:bg-[#000000d9]"
                                            onClick={() => {
                                                setShowCompany(true)
                                            }}
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.4641 9.02344V20.3508H12.4664V9.02344H12.4641Z" fill="#343535" />
                                                <path d="M15.7242 11.6508H17.7398V12.0258H15.7242V11.6508ZM15.7242 14.6508H17.7398V15.0258H15.7242V14.6508ZM5.48203 5.65076H7.49765V6.02576H5.48203V5.65076ZM8.99999 5.65076H11.0156V6.02576H8.99999V5.65076ZM5.48203 8.64841H7.49765V9.02341H5.48203V8.64841ZM8.99999 8.64841H11.0156V9.02341H8.99999V8.64841ZM5.48437 11.6601H7.49999V12.0351H5.48437V11.6601ZM8.99999 11.6531H11.0156V12.0281H8.99999V11.6531Z" fill="#fafafa" />
                                                <path d="M9.33516 16.5094C9.05625 16.2304 8.66953 16.057 8.24531 16.057C7.39687 16.057 6.70312 16.7508 6.70312 17.5992V20.3508H7.17188V17.5992C7.17188 17.3133 7.28438 17.0461 7.48828 16.8422C7.69219 16.6383 7.96172 16.5258 8.24531 16.5258C8.53125 16.5258 8.79844 16.6383 9.00234 16.8422C9.20625 17.0461 9.31875 17.3156 9.31875 17.5992V20.3508H9.7875V17.5992C9.7875 17.175 9.61406 16.7906 9.33516 16.5094Z" fill="#fafafa" />
                                                <path d="M13.4953 10.0547V20.318H13.4977V10.0547H13.4953Z" fill="#343535" />
                                                <path d="M21 20.3508V9.02341H13.4977V2.6156H3V20.3508H1.5V21.382H22.5V20.3508H21ZM12.4664 20.3508H4.03125V3.64685H12.4664V20.3508ZM19.9687 20.3156H13.4953V10.0547H19.9687V20.3156Z" fill="#fafafa" />
                                            </svg>
                                            Add Child Company
                                        </button>
                                }
                            </div>
                        )
                    }

                </div>
            </div>

        </div>
    );
};

export default Profile;
