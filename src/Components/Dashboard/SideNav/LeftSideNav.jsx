import { useNavigate } from "react-router-dom"

const LeftSideNav = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col space-y-6 md:p-4 bg-gray-200 rounded-md md:w-[300px] w-full md:m-2 max-h-full overflow-hidden fixed md:top-[70px] bottom-0 justify-between">
            {/* Project Entry Section */}
            <div className="md:flex md:flex-col bg-white h-fit rounded-lg  md:p-4 md:space-y-4 shadow-md justify-between grid grid-cols-5 w-full p-1">
                {/* Project Entry */}
                <div onClick={()=>{
                    navigate('/dashboard/new-acivity')
                }} className="flex md:border-b flex-col items-center md:flex-row md:items-center md:py-2  justify-center md:justify-normal group cursor-pointer">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="10" fill="url(#paint0_linear_531_48)" />
                        <path d="M20.5 10.2917V30.7083M10.2917 20.5H30.7083" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="paint0_linear_531_48" x1="3.49828e-07" y1="20.4444" x2="40" y2="20.4444" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F6AD0C" />
                                <stop offset="1" stopColor="#F0D707" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                        <span className="text-[8px] font-semibold md:font-normal md:text-base text-center md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Project Entry</span>
                    </div>
                </div>

                {/* Project overview */}

                <div onClick={()=>{
                    navigate('/dashboard/show-existing-acivity')
                }} className="flex flex-col items-center md:flex-row md:items-center md:py-1  justify-center md:justify-normal group cursor-pointer">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="10" fill="url(#paint0_linear_531_48)" />
                        <path d="M20.5 10.2917V30.7083M10.2917 20.5H30.7083" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="paint0_linear_531_48" x1="3.49828e-07" y1="20.4444" x2="40" y2="20.4444" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F6AD0C" />
                                <stop offset="1" stopColor="#F0D707" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                        <span className="text-[8px] font-semibold md:text-base text-center md:font-normal md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Project Overview</span>
                    </div>
                </div>

                {/* Material entry */}

                <div className="flex flex-col items-center md:flex-row md:items-center md:py-1  justify-center md:justify-normal cursor-pointer group">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="10" fill="url(#paint0_linear_531_48)" />
                        <path d="M20.5 10.2917V30.7083M10.2917 20.5H30.7083" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="paint0_linear_531_48" x1="3.49828e-07" y1="20.4444" x2="40" y2="20.4444" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F6AD0C" />
                                <stop offset="1" stopColor="#F0D707" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                        <span className="text-[8px] font-semibold md:text-base text-center md:font-normal md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Material Entry</span>
                    </div>
                </div>

                {/* Material overview */}

                <div className="flex flex-col items-center md:flex-row md:items-center md:py-1  justify-center md:justify-normal group cursor-pointer">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="10" fill="url(#paint0_linear_531_48)" />
                        <path d="M20.5 10.2917V30.7083M10.2917 20.5H30.7083" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="paint0_linear_531_48" x1="3.49828e-07" y1="20.4444" x2="40" y2="20.4444" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F6AD0C" />
                                <stop offset="1" stopColor="#F0D707" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                        <span className="text-[8px] font-semibold md:text-base text-center md:font-normal md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Material Overview</span>
                    </div>
                </div>

                {/* Libary */}
                <div className="flex  flex-col items-center md:flex-row md:items-center md:py-1  justify-center md:justify-normal group cursor-pointer">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        height="30"
                        width="30"
                    >
                        <path d="M16 6l4 14M12 6v14M8 8v12M4 4v16" />
                    </svg>

                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                        <span className="text-[8px] font-semibold md:text-base text-center md:font-normal md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Libary</span>
                    </div>
                </div>

                {/* Menu Items */}


            </div>

            {/* Color Legend Section */}
            <div className="bg-white rounded-lg p-4 space-y-4 shadow-md text-sm text-gray-700 hidden md:block">
                {/* All Users */}

                <div className="flex flex-col items-center md:flex-row md:items-center md:py-1  justify-center md:justify-normal group cursor-pointer">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M34 42V38C34 35.8783 33.1571 33.8434 31.6569 32.3431C30.1566 30.8429 28.1217 30 26 30H10C7.87827 30 5.84344 30.8429 4.34315 32.3431C2.84285 33.8434 2 35.8783 2 38V42M46 42V38C45.9987 36.2275 45.4087 34.5055 44.3227 33.1046C43.2368 31.7037 41.7163 30.7031 40 30.26M32 6.26C33.7208 6.7006 35.2461 7.7014 36.3353 9.10462C37.4245 10.5078 38.0157 12.2337 38.0157 14.01C38.0157 15.7863 37.4245 17.5122 36.3353 18.9154C35.2461 20.3186 33.7208 21.3194 32 21.76M26 14C26 18.4183 22.4183 22 18 22C13.5817 22 10 18.4183 10 14C10 9.58172 13.5817 6 18 6C22.4183 6 26 9.58172 26 14Z" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>


                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                        <span className="text-[8px] font-semibold md:text-base text-center md:font-normal md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Users</span>
                    </div>
                </div>
                {/* FAQ */}

                <div className="flex flex-col items-center md:flex-row md:items-center md:py-1  justify-center md:justify-normal group cursor-pointer">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        height="30"
                        width="30"
                    >
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                        <path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z" />
                    </svg>

                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                        <span className="text-[8px] font-semibold md:text-base text-center md:font-normal md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">FAQ</span>
                    </div>
                </div>
                {/* Profile */}

                <div className="flex flex-col items-center md:flex-row md:items-center md:py-1  justify-center md:justify-normal group cursor-pointer">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg fill="none" viewBox="0 0 24 24" height="30" width="30" >
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M16 9a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"
                            clipRule="evenodd"
                        />
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0112.065 14a8.984 8.984 0 017.092 3.458A9 9 0 103 12zm9 9a8.963 8.963 0 01-5.672-2.012A6.992 6.992 0 0112.065 16a6.991 6.991 0 015.689 2.92A8.964 8.964 0 0112 21z"
                            clipRule="evenodd"
                        />
                    </svg>

                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                        <span className="text-[8px] font-semibold md:text-base text-center md:font-normal md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Profile</span>
                    </div>
                </div>

                {/* Sign out */}

                <div className="flex flex-col items-center md:flex-row md:items-center md:py-1  justify-center md:justify-normal group cursor-pointer">
                    {/* <FaPlusSquare size={24} className="text-yellow-500" /> */}
                    <svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        height="30"
                        width="30"
                    >
                        <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z" />
                    </svg>

                    <div className="md:flex md:flex-col md:px-4 md:items-start md:space-y-1 flex py-1">
                        <span className="text-[8px] font-semibold md:text-base text-center md:font-normal md:group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">Sign Out</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LeftSideNav

