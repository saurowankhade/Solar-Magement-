import BoxAnalytics from "./BoxAnalytics"

const TrackAnalytics = () => {
  return (
    <div>
        < div className="w-full  gap-2 sm:flex justify-around">
        <BoxAnalytics props={{imgNo:0,name:"Inquiry No",count:120}}/>
        <BoxAnalytics props={{imgNo:1,name:"Site Work Done",count:100}}/>
        <BoxAnalytics props={{imgNo:2,name:"Inspection No",count:120}}/>
    </div>
    <div className="w-full  gap-2 sm:flex justify-around">
        <BoxAnalytics props={{imgNo:3,name:"Meter Installation",count:120}}/>
        <BoxAnalytics props={{imgNo:4,name:"NSC Approved",count:8}}/>
        <BoxAnalytics props={{imgNo:5,name:"Subsidy",count:12}}/>
    </div>
    </div>
  )
}

export default TrackAnalytics
