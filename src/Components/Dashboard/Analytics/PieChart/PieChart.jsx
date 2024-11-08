import  { useContext, useEffect, useState } from "react";
import {Chart as ChartJS, ArcElement,Tooltip,Legend} from 'chart.js'
import { Doughnut } from "react-chartjs-2";
import AllTrackContext from "../../../../Context/AllTrackData/AllTrackContext";
ChartJS.register(
    ArcElement,Tooltip,Legend
)
const PieChart = () => {
    const {allTrack} = useContext(AllTrackContext)
    const [enquiryData,setEnquiryData] = useState([]);
    const [siteWorkData,setSiteWorkData] = useState([]);
    const [inspectionData,setInspectionData] = useState([]);
    const [meterInstallationData,setMeterInstallationData] = useState([]);
    const [NSCApprovedData,setNSCApprovedData] = useState([]);
    const [subsidyData,setSubsidyData] = useState([]);
  
    useEffect(()=>{
      if(allTrack.length > 0){
        setEnquiryData(allTrack.filter((data)=>
          data?.data?.ConsumerName     
        ))
        setSiteWorkData( allTrack.filter((data)=>
          data?.data?.SiteWorkInfromation?.isDone === true     
        ))
        setInspectionData( allTrack.filter((data)=>
          data?.data?.InspectionInfromation?.isDone === true     
        ))
        setMeterInstallationData( allTrack.filter((data)=>
          data?.data?.MeterInfromation?.isDone === true     
        ))
        setNSCApprovedData( allTrack.filter((data)=>
          data?.data?.NetMeteringInfromation?.isDone === true     
        ))
        setSubsidyData( allTrack.filter((data)=>
          data?.data?.SubsidyInfromation?.isDone === true     
        ))
      }
    },[allTrack])

    const data = {
        labels: [`Enquiry Number `,'Site work','Inspection','Mater Installation','NSC Approved','Subsidy'],
        font:'12',
        datasets:[{
            label : '',
            data:[enquiryData.length,siteWorkData.length,inspectionData.length,meterInstallationData.length,NSCApprovedData.length,subsidyData.length],
            backgroundColor:['#A3E635','#84CC16','#FACC15','#FB923C','#F97316','#EF4444'],
            borderColor: ['#A3E635','#84CC16','#FACC15','#FB923C','#F97316','#EF4444'],
        }]
    }
    const options = {
        responsive: true,        // Automatically resizes with screen
        maintainAspectRatio: false,  // Allows customization of height/width
        elements: {
            arc: {
              borderWidth: 0, // Remove outer circular border (set to 0)
            },
          },
        plugins: {
            title: {
                display: true,
                text: `Total Project `,
                font: {
                  size: 14, // Font size in pixels
                  weight: 'bold', // Font weight (e.g., 'normal', 'bold', 'bolder', or numeric values)
                  family: 'inter', // Font family (e.g., 'Arial', 'Times New Roman', etc.)
                },
                color:'black',
                padding: { // Space above the title
                  bottom: 10, // Space below the title
                },
              },
          legend: {
            display: true,
            position: 'right',
            align: 'center',
            fontSize:8,
            labels: {
              boxWidth: 12,   // Adjusts the legend box size
              padding: 10,    // Adds spacing between legend items
              font: {
                size: 12, // Set the font size here
              },
            },
          },
          tooltip: {
            enabled: true         // Enables tooltips on hover
          },
        },
        
        cutout: '80%',
      };


      const doughnutLabel = {
        id: 'doughnutLabel',
        afterDatasetsDraw(chart,args,plugins){
          const {ctx,data} = chart;
          const centerX = chart.getDatasetMeta(0).data[0].x;
          const centerY = chart.getDatasetMeta(0).data[0].y;
          ctx.save();
          ctx.font = 'bold 16px Arial';  // Set font for line 1
ctx.fillStyle = 'black';        // Text color
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

const line2 = `Total Project`;
const line1 = `${data.datasets[0].data[0]}`;
const lineHeight = 20;          // Adjust based on font size for proper spacing

// Draw line 1
ctx.fillText(line1, centerX, centerY);

// Style for line 2
ctx.font = '14px Inter'; // Set font for line 2
ctx.fillStyle = 'grey';         // You can also change the color for the second line

// Draw line 2, with adjusted y position
ctx.fillText(line2, centerX, centerY + lineHeight);
        }
      }
      
   return (
    <div className="md:w-[500px] md:h-[290px] bg-white w-full h-[300px] 
    md:ml-[350px]  md:-mt-2  shadow-md rounded-md flex items-center justify-center p-3">
        <Doughnut  data={data} options={options} plugins={[doughnutLabel]} />
    </div>
   )
}

export default PieChart
