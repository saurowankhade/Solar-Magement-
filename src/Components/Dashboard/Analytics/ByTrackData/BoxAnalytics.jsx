import CountUp from 'react-countup';

import inquriyImg from '../../../../assets/inquriy.png'
import siteWorkImg from '../../../../assets/site-work.png'
import inspectionImg from '../../../../assets/inspection.png'
import meterIntallationImg from '../../../../assets/meter-install.png'
import nscApprovedImg from '../../../../assets/nsc-approve.png'
import subsidyImg from '../../../../assets/subsidy.png'

const BoxAnalytics = ({props}) => {
    const {imgNo ,name,count} = props ;
    const imgArray = [inquriyImg,siteWorkImg,inspectionImg,meterIntallationImg,nscApprovedImg,subsidyImg
    ];
  return (
    <div className="border  my-2 w-full flex p-6 items-center justify-between shadow-md rounded-sm">
    <div className=" w-full ">
      <img className="w-16 h-16 " src={imgArray[imgNo]} alt={`${name} image`} />
    </div>
    <div className="w-full ">
      <h4 className="text-base font-bold text-gray-950 font-mono"><CountUp end={count} duration={5}/></h4>
      <h4 className="text-base font-normal text-gray-800 font-mono">{name}</h4>
      
    </div>
  </div>
  )
}

export default BoxAnalytics
