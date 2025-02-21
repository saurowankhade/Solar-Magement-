import React, { useContext, useEffect, useRef, useState } from 'react'
import firestore from '../../Firebase/Firestore';
import { toast } from 'react-toastify';
import Loading from 'react-loading';
import UserContext from '../../Context/UserContext/UserContext';
import CelebrationUI from './CelebrationUI';

const CompanyRegister = ({showCompany, setShowCompany ,showCelebration , setShowCelebration,companyId,setCompanyId }) => {

    const [isLoading, setIsLoading] = useState(false);
     

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const mobileNoRef = useRef(null);

    const {user} = useContext(UserContext);

    const [mobileNos, setMobileNos] = useState([]);

    useEffect(() => {
        firestore.getCompanyIds()
            .then((data) => {
                setMobileNos(data.map((onlyIds) => onlyIds?.mobileNo))
            });  

    }, [])

    const handleButtonClick = (event) => {
        event.preventDefault();
        setShowCelebration(true);
        
        const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        let ranStr = "";
        for (let i = 0; i <= 4; i++) {
            ranStr += str.charAt(Math.floor(Math.random() * str.length + 1));
        }
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const mobileNo = mobileNoRef.current.value;

        setCompanyId(mobileNo+ranStr);

        const companyID = mobileNo + ranStr;
        const planEnd = new Date();
        planEnd.setDate(planEnd.getDate() + 20);
        console.log('back');
        // setCompanyId(companyID);
        if (!mobileNos.includes(mobileNo)) {
            console.log('here');
            
            setIsLoading(true)
            firestore.addData("CompanyRegister", {
                name: name,
                mobileNo: mobileNo,
                email: email,
                companyID: companyID,
                isPaid: false,
                RegisterAt: new Date(),
                PlanStart: new Date(),
                PlanEnd: planEnd,
                parentCompanyID:user?.companyID.find(name => name.toLowerCase().includes(user?.mobileNo.toLowerCase())) || user?.mobileNo ,
                createBy:user?.userID
            }, companyID).then((status) => {
                setIsLoading(false)
                if (status.status === 200) {
                    addChildID(companyID);
                } else {
                    toast.error("Failed to Register")
                }
            })
        } else {
            toast.error('Mobile already present!')
        }


    }
    const addChildID = (companyId)=>{
        setIsLoading(true)
        firestore.updateData("Users",{
            companyID:[...user?.companyID,companyId]
        },user?.userID)
        .then((status)=>{
            if(status.status === 200){
                setShowCelebration(true);
                setShowCompany(false)
                toast.success("Child Company Register!")
            } else{
                toast.error(status.message)
            }
            setIsLoading(false)
        }).catch((e)=>{
            console.log(e);
            
        })
    }

    return(
        <section className={` overflow-hidden ${showCompany ? ' block animate-fadeInOut' : 'hidden'}`}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">

                    <div className='flex justify-end p-2'>
                        <svg onClick={()=>{
                            if(!isLoading) setShowCompany(false);
                        }} className='cursor-pointer' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.1844 10L19.3296 3.88889C20.2235 3 20.2235 1.66667 19.3296 0.777778C18.9944 0.333333 18.4358 0 17.8771 0C17.3184 0 16.7598 0.222222 16.3129 0.666667L10.0559 6.88889L3.91061 0.777778C3.01676 -0.111111 1.56425 -0.111111 0.782123 0.777778C0.335195 1.11111 0 1.66667 0 2.33333C0 3 0.223464 3.44444 0.670391 3.88889L6.81564 10L0.670391 16.1111C0.335195 16.5556 0 17.1111 0 17.7778C0 18.3333 0.223464 18.8889 0.670391 19.3333C1.11732 19.7778 1.67598 20 2.23464 20C2.7933 20 3.35196 19.7778 3.79888 19.3333L9.94413 13.2222L16.0894 19.3333C16.9832 20.2222 18.4358 20.2222 19.2179 19.3333C20.1117 18.4444 20.1117 17 19.2179 16.2222L13.1844 10Z" fill="black" />
                        </svg>
                    </div>

                    <div  className="p-6 space-y-4 md:space-y-6 sm:p-4">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Child Company Deatils
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleButtonClick}>
                            <div>
                                <input type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Name" required ref={nameRef} />

                            </div>

                            <div>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Email" required ref={emailRef} />
                            </div>
                            <div>
                                <input type="tel" name="number" id="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Mobile No" maxLength={10} minLength={10} required ref={mobileNoRef} />
                            </div>


                            <div type='submit' className='flex items-center justify-center r'>


                                {
                                    isLoading ? <Loading type='spinningBubbles' color='black' height={'10%'} width={'10%'} /> :
                                        <button className='w-full text-[#fafafa] bg-black  focus:outline-none font-medium rounded-lg text-sm px-5 py-2 hover:cursor-pointe' type="submit">Add Branch</button>
                                }
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CompanyRegister
