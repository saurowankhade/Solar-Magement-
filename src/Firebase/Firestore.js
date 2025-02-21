import { db } from "./firebase";
import { collection, deleteDoc, doc,FieldPath,getDoc, getDocs ,onSnapshot,orderBy,query,setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { setItem } from "../utils/LocalStorage/localAuth";

class Firestore {

  async addData(collection, data, documentID) {
    try {
      await setDoc(doc(db, collection, documentID), data);
      return { status: 200, message: 'Data saved!' };
    } catch (error) {
      console.log(error);
      
      return { status: 500, message: error,Id:documentID };
    }
  }
  async updateData(collection, data, documentID) {
    try {
      // Reference to the specific document in the collection
      const docRef = doc(db, collection, documentID);
      
      // Update the document with the new data fields
      await updateDoc(docRef, data);
            
      return { status: 200, message: 'Data updated successfully!' };
    } catch (error) {
      console.log(error);
      
      return { status: 500, message: error.message, Id: documentID };
    }
  }

      async getUserData (userID)  {
        try {
          const docRef = doc(db, "Users",userID);
          const docSnap = await getDoc(docRef); 
          return docSnap.exists() ? docSnap.data() : ""
        } catch (error) {
          setItem("isLogin",{isLogin:false,userID:""})
          console.error("Error getting document: ", error);
        }
      }

      async subscribeToUserData(userID, setUser) {
        try {
          // Reference the Firestore document
          const docRef = doc(db, "Users", userID);
      
          // Attach real-time listener
          const unsubscribe = onSnapshot(
            docRef,
            (docSnap) => {
              if (docSnap.exists()) {
                setUser(docSnap.data()); // Update UI or state with the document's data
              } else {
                console.warn("Document does not exist!");
                setUser(""); // Clear the state if document doesn't exist
              }
            },
            (error) => {
              console.error("Error getting real-time document updates: ", error);
              setItem("isLogin", { isLogin: false, userID: "" }); // Handle error (e.g., log out the user)
            }
          );
      
          // Return the unsubscribe function to allow cleanup
          return unsubscribe;
        } catch (error) {
          console.error("Error setting up real-time listener: ", error);
          setItem("isLogin", { isLogin: false, userID: "" });
        }
      }
      


      
      async getOneData (collectionName,docsId)  {
        try {
          const docRef = doc(db, collectionName, docsId);
          const docSnap = await getDoc(docRef);
          return docSnap.exists() ? docSnap.data() : ""
          
        } catch (error) {
          console.error("Error getting document: ", error);
        }
      }

      async getAllUser(){
        try {
          // Reference to the collection
          const collectionRef = collection(db, "Users");

      // Get the documents based on the query
          const snapshot = await getDocs(collectionRef);
          
          if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
          }
      
          // Map document data
          const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
          return documents;
        } catch (error) {
          console.error('Error fetching documents:', error);
          return [];
        }
      }

      async getCompanyIds(){
        try {
          // Reference to the collection
          const collectionRef = collection(db, "CompanyRegister");

      // Get the documents based on the query
          const snapshot = await getDocs(collectionRef);
          
          if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
          }
      
          // Map document data
          const documents = snapshot.docs.map(doc => ({ ...doc.data() }));
          
          return documents;
        } catch (error) {
          console.error('Error fetching documents:', error);
          return [];
        }
      }
     

      async getAllDocuments(collectionName) {
        try {
          // Reference to the collection
          const collectionRef = collection(db, collectionName);
      
          // Create a query with orderBy for sorting by date
                   
          const q = collectionName === "Users" ? collectionRef : 
          collectionName.includes("MaterialList") ? query(collectionRef,
            orderBy(new FieldPath('Basic', 'CreatedAt'), 'desc')) : 
            query(collectionRef,orderBy(new FieldPath('data', 'CreatedAt'), 'desc'),
          );
           // Use FieldPath for nested fields
      
          // Get the documents based on the query
          const snapshot = await getDocs(q);
          
          if (snapshot.empty) {
            return {status:204,message:"No data",data:[]};
          }
      
          // Map document data
          const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                    
          return {status:200,message:"Data",data:documents};
        } catch (error) {
          console.error('Error fetching documents:', error);
          return {status:500,message:error,data:[]};
        }
      }

      async  getConsumerDetails(collectionName) {
        try {
          const collectionRef = collection(db, collectionName);
      
          // Use the spread syntax to pass the list of fields to select()
          const q = query(collectionRef);
      
          const snapshot = await getDocs(q);
      
          if (snapshot.empty) {
            return { status: 204, message: "No data", data: [] };
          }
      
          // Map document data
          const documents = snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ConsumerName:doc.data().data.ConsumerName,
            ConsumerAddress:doc.data().data.ConsumerAddress
           }));
          // console.log(documents);
      
          return { status: 200, message: "Data", data: documents };
        } catch (error) {
          console.error('Error fetching documents:', error);
          return { status: 500, message: error.message, data: [] };
        }
      }

      async  getMaterialListForTable(collectionName) {
        try {
          const collectionRef = collection(db, collectionName);
      
          // Use the spread syntax to pass the list of fields to select()
          const q = query(collectionRef);
      
          const snapshot = await getDocs(q);
      
          if (snapshot.empty) {
            return { status: 204, message: "No data", data: [] };
          }
      
          // Map document data
          const documents = snapshot.docs.map(doc => ({ 
            id: doc.id, 
            CreatedAt : doc.data().CreatedAt,
            ConsumerName:doc.data().ConsumerName,
            ConsumerAddress:doc.data().ConsumerAddress,
            TeamName : doc.data().TeamName,
            Verify : doc.data().Verify
           }));
          // console.log(documents);
      
          return { status: 200, message: "Data", data: documents };
        } catch (error) {
          console.error('Error fetching documents:', error);
          return { status: 500, message: error.message, data: [] };
        }
      }

      async fetchDocuments(collectionName) {
        const collectionRef = collection(db, collectionName);
    
        let q;
        if (collectionName === "Users") {
            q = collectionRef;
        } else {
            q = query(
                collectionRef,
                orderBy(new FieldPath('data', 'CreatedAt'), 'desc')
            );
        }
    
        // console.log("Collection name:", collectionName);
    
        return new Promise((resolve, reject) => {
            const unsubscribe = onSnapshot(q, (snapshot) => {
                if (snapshot.empty) {
                    reject('No data available');
                } else {
                    const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    // console.log("Documents:", documents);
                    resolve(documents);
                }
            }, (error) => {
                // console.error("Snapshot error:", error);
                reject(error);
            });
    
            // Optionally, return the unsubscribe function if needed
            return unsubscribe;
        });
    }


    async getAllBranchCompany(userId){
      try {
        // Reference to the collection
        const collectionRef = collection(db, "CompanyRegister");

    const q = query(collectionRef, where("createBy", "==", userId));

    // Get the documents based on the query
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
          console.log('No matching documents.');
          return [];
        }
    
        // Map document data
        const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        return documents;
      } catch (error) {
        console.error('Error fetching documents:', error);
        return [];
      }
    }


       // Delete a document by ID
  async deleteDocument(collectionName, documentId) {
    try {
      const documentRef = doc(db, collectionName, documentId);
      await deleteDoc(documentRef)
      .then(()=>{
        toast.success("Deleted !!")
      }).catch((error)=>{
        toast.error(error.message)
      })
    } catch (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  }

  formatTimestamp(timestamp) {
    // console.log(timestamp);
    
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toString().replace("(India Standard Time)","(IST)"); // Or any other format you prefer
    
    }
    return timestamp.toString(); // Return empty string if not a valid timestamp
  }
      
}

const firestore = new Firestore();
export default firestore;