import CountUp from 'react-countup';

import inquriyImg from '../../../../assets/inquriy.png'
import siteWorkImg from '../../../../assets/site-work.png'
import inspectionImg from '../../../../assets/inspection.png'
import meterIntallationImg from '../../../../assets/meter-install.png'
import nscApprovedImg from '../../../../assets/nsc-approve.png'
import subsidyImg from '../../../../assets/subsidy.png'
import { useContext } from 'react';
import UserContext from '../../../../Context/UserContext/UserContext'
import { useNavigate } from 'react-router-dom';

const BoxAnalytics = ({props}) => {
    const {imgNo ,name,count} = props ;
    const imgArray = [inquriyImg,siteWorkImg,inspectionImg,meterIntallationImg,nscApprovedImg,subsidyImg
    ];
    const {user} = useContext(UserContext)

    const navigate = useNavigate();

    const handleTrackClick = ()=>{
      const data = {name:name,index:imgNo}
      navigate('/dashboard/show-existing-acivity',{state:data})
    }
  return (
    <div onClick={handleTrackClick} className={`border hover:cursor-pointer  my-2 w-full flex p-6 items-center justify-between shadow-md rounded-sm ${user?.name ? "" : " animate-pulse "}`}>
    <div className=" w-full ">
      <img className="w-16 h-16 " src={imgArray[imgNo]} alt={`${name} image`} />
    </div>
    <div className="w-full">
      <h1 className="text-base font-bold text-gray-950 font-mono"><CountUp end={count} duration={1}/></h1>
      <h4 className="text-base font-normal text-gray-800 font-mono">{name}</h4>  
    </div>
  </div>
  )
}

export default BoxAnalytics
