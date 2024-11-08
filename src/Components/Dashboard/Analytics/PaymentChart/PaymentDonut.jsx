import { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import AllTrackContext from '../../../../Context/AllTrackData/AllTrackContext';


Chart.register(...registerables);
function PaymentStackedBar() {
  const {allTrack} = useContext(AllTrackContext)
  const [totalAmount,setTotalAmount] = useState([]);
  const [balanceAmount,setBalanceAmount] = useState([]);
  const [totalAmountPayment,setTotalAmountPayment] = useState(0);
  const [totalBalancePayment,setBalanceAmountPayment] = useState(0);
  useEffect(()=>{
    if(allTrack.length > 0){
      setTotalAmount(allTrack.filter((data)=>
        data?.data?.TotalAmount     
      ))
      setBalanceAmount(allTrack.filter((data)=>
        data?.data?.BalanceAmount     
      ))

    }
  },[allTrack])
  useEffect(()=>{
    setTotalAmountPayment(totalAmount.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.data?.TotalAmount;
    }, 0))

     setBalanceAmountPayment(balanceAmount.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.data?.BalanceAmount;
    }, 0))

  },[totalAmount,balanceAmount])
    const data = {
        labels: ['Payments'],
        datasets: [
          {
            label: 'Total',
            data: [totalAmountPayment],
            backgroundColor: '#F7AB0D',
            borderColor: '#F7AB0D',
            borderWidth: 1,
            borderRadius: {
              topLeft: 20, // Rounded top corners for cylinder effect
              topRight: 20,
              bottomLeft: 20,
              bottomRight: 20,
            },
            barPercentage: 0.2,
          },
          {
            label: 'Balanced',
            data: [totalBalancePayment],
            backgroundColor: '#FB923C',
            borderColor: '#FB923C',
            borderWidth: 1,
            borderRadius: {
                topLeft: 20, // Rounded top corners for cylinder effect
                topRight: 20,
              bottomLeft: 0, // Rounded bottom corners for cylinder effect
              bottomRight: 0,
            },
            barPercentage: 0.2,
          },
        ],
      };
    
      const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.3,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: `Payment Status`,
            font: {
              size: 14,
              weight: 'bold',
              family: 'inter',
            },
            color: 'black',
            padding: {
              bottom: 10,
            },
          },
        },
        scales: {
          x: {
            stacked: false,
            display: false,
          },
          y: {
            stacked: false,
            display: true,
            
          },
        },
      };
      
  return (
    <div className='md:h-full h-[300px]'> {/* Set height here */}
      <Bar style={{width:'100px',}} data={data} options={options} />
    </div>
  );
}

export default function PaymentChart() {
  return(
    <div className='md:mt-14 p-2 mt-10 bg-white   shadow-md rounded-md md:w-[450px]'>
         <PaymentStackedBar />
    </div>
  );
}
