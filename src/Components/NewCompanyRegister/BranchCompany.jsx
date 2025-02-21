import { useContext, useEffect, useState } from 'react'
import UserContext from '../../Context/UserContext/UserContext'
import CompanyRegister from './CompanyRegister';
import firestore from '../../Firebase/Firestore';
import CelebrationUI from './CelebrationUI';

const BranchCompany = () => {
    const { user } = useContext(UserContext);
    const [showCompany , setShowCompany] = useState(false);
    const [showCelebration , setShowCelebration] = useState(false);
    const [companyId , setCompanyId] = useState('');
    const [companyData , setCompanyData] = useState([]);

    useEffect(()=>{
        firestore.getAllBranchCompany(user?.userID)
        .then((data)=>{
            setCompanyData(data);
        })
    },[user]);

    return user?.isCmp === false ? (<div className='mt-32 flex items-center justify-center'>Looks like you are not company ower ! </div>) :
        (
            <div className={`  ${showCompany || showCelebration ? 'mt-0' : 'mt-20'} `}>
                
                {
                    showCompany && (
                        <div className='bg-[#00000016] backdrop-blur-lg  w-full absolute'>
                <CompanyRegister showCompany={showCompany} setShowCompany={setShowCompany} showCelebration={showCelebration} setShowCelebration={setShowCelebration} companyId={companyId} setCompanyId={setCompanyId} />
                </div>
                    )
                }
                {
                    showCelebration &&(
                        <div className=''>
                <CelebrationUI id={companyId || '1234567890GIHU'} showCelebration={showCelebration} setShowCelebration={setShowCelebration} />
                </div>
                    )
                }


                <div className='flex items-end justify-end mr-4'>
                    <button
                        className="bg-black flex gap-2 justify-end items-center  text-white px-4 py-2 rounded-md hover:bg-[#000000d9] "
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
                        Add Branch
                    </button>
                </div>
               


               




            </div>
        )
}

export default BranchCompany
