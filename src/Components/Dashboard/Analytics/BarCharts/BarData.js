
export const data = (data)=>{
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: '',
          data: data,
          fill: true,
          backgroundColor : '#60a5fa',
          // backgroundColor: 'yellow',
         
        },
      ],
      borderWidth: 1
    }
  };
  
  export const options = {
    responsive: true, // Ensures the chart is responsive
    maintainAspectRatio: false, // Allows the chart to resize based on its container
    plugins: {
      legend: {
        position: 'top',
        onClick: (e) => e.stopPropagation(), // Disable the toggle functionality
        display:false
      },
      title: {
        display: true,
        text: `Monthly Enquiries for the year ${new Date().getFullYear()}`,
        font: {
          size: 14, // Font size in pixels
          weight: 'bold', // Font weight (e.g., 'normal', 'bold', 'bolder', or numeric values)
          family: 'mono', // Font family (e.g., 'Arial', 'Times New Roman', etc.)
        },
        color:'black',
        padding: { // Space above the title
          bottom: 10, // Space below the title
        },
      },
    },
    scales: {
    x: {
      beginAtZero: true,
      grid: {
        color: 'gray', // Grid line color
        lineWidth: 1,   // Make the grid lines bold
      },
      ticks: {
        color: 'black', // X-axis label color
      },
    },
    y: {
      beginAtZero: true,
      suggestedMax: 10, // Suggested max value for y-axis
      grid: {
        color: 'gray', // Grid line color
        lineWidth: 1,   // Make the grid lines bold
      },
      ticks: {
        color: 'black', // Y-axis label color
      },
    },
  },
  };
  
  