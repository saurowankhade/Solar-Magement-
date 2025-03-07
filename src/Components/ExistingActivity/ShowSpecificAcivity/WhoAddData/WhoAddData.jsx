import firestore from "../../../../Firebase/Firestore"

const WhoAddData = (props) => {
    // eslint-disable-next-line react/prop-types
    const {date,user,isTeam,teamName} = props 
    if(!date && !user) return <></>
  return (
    <div>
      
      <div className="flex justify-center">
      <div className="p-2  shadow-md border  w-[700px]  ">
      <h3 className="text-center text-xl underline">{isTeam ? 'Details' : 'Who added this'}</h3>
          <div className="mt-2">
            <span className="text-base font-bold">Date : </span>
           <span className="text-black">{firestore.formatTimestamp(date) }</span>
          </div>
           <div className="mt-2">
            <span className="text-base font-bold">Created By : </span> 
             {/* eslint-disable-next-line react/prop-types */}
            <span className="text-black">{user?.name} </span>
           </div>
           <div className="mt-2">
            <span className="text-base font-bold">Job Profile : </span> 
             {/* eslint-disable-next-line react/prop-types */}
            <span className="text-black">{user?.jobProfile} </span>
           </div>
           {
            isTeam && <div className="mt-2">
            <span className="text-base font-bold">Team Name : </span> 
             {/* eslint-disable-next-line react/prop-types */}
            <span className="text-black">{teamName} </span>
           </div>
           }
      </div>
    </div>
    </div>
  )
}

export default WhoAddData
