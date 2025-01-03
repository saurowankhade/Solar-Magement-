import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,Filler
} from 'chart.js'
import { data, options } from './BarData';
import { useContext, useEffect, useState } from 'react';
import ShowAllUserContext from '../../../../Context/ShowAllUsersContext/ShowAllUserContext';
import AllTrackContext from '../../../../Context/AllTrackData/AllTrackContext';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const ChartsBar = ()=>{  
  const [trackData,setTrackData] = useState([]);
  const da = data(trackData);
  const { allTrack } = useContext(AllTrackContext);

  const [filterData,setFilterData] = useState([]);
  ChartJS.register(Filler);
useEffect(() => {
  if (allTrack) {
    const filteredData = allTrack.filter((preData)=> preData?.data?.ConsumerName && (preData?.data?.CreatedAt).toDate().getFullYear() === new Date().getFullYear() )
    setFilterData(filteredData) 
  }
}, [allTrack]);

useEffect(()=>{
  const groupedByMonth = filterData.reduce((acc, preData) => {
    const createdAtStr = preData?.data?.CreatedAt;
    const createdAt = createdAtStr.toDate();    
    
    const month = createdAt.toLocaleString('default', { month: 'short' }); // e.g., 'Jan', 'Feb'
    // console.log("Month: ", month);
    
    // Increment the count for the respective month
    acc[month] = (acc[month] || 0) + 1;
    
    return acc;
  }, {});

  const monthArray = Array(12).fill(0);

  // Map month abbreviations to index
  const monthMap = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };

  // Update the array with counts
  for (const [month, count] of Object.entries(groupedByMonth)) {
    const index = monthMap[month];
    if (index !== undefined) {
      monthArray[index] = count;
    }
  }
  setTrackData(monthArray)  
},[filterData])

  return (
    <>
        <div className='md:h-[300px] w-full h-[200px] bg-white 
         md:w-[700px] md:mt-14 md:ml-[350px] border shadow-md rounded-md p-2 mt-8 '>
            <Bar options={options} data={da} />
        </div>
  </>
  )
}
export default ChartsBar;
