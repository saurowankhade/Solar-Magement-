import { useEffect, useState } from "react";
import firestore from "../../Firebase/Firestore"

 const Data = ()=>{
    const [data,setData] = useState([]);
    
    useEffect(() => {
        let isMounted = true; // Add this variable to keep track of whether the component is mounted or not
        const fetchData = async () => {
          try {
            const fetchedData = await firestore.getAllDocuments("Users");
            if (isMounted) { // Check if the component is still mounted before updating the state
              setData(fetchedData.filter(user => user.companyID === "1234567890OPZOU"));
            }
          } catch (error) {
            if (isMounted) { // Check if the component is still mounted before updating the state
              console.error('Error fetching data: ', error);
            }
          }
        };
    
        fetchData();
    
        return () => {
          isMounted = false; // Cleanup function to set isMounted to false when the component is unmounted
        };
      }, []);
}
export default Data