import { db } from "./firebase";
import { collection, deleteDoc, doc,FieldPath,getDoc, getDocs ,limit,onSnapshot,orderBy,query,setDoc, startAfter, startAt, Timestamp, updateDoc, where } from "firebase/firestore";
import authentication from "./authentication";
import { toast } from "react-toastify";
import { setItem } from "../utils/LocalStorage/localAuth";

class Firestore {

  async addData(collection, data, documentID) {
    try {
      await setDoc(doc(db, collection, documentID), data);
      return { status: 200, message: 'Data saved!' };
    } catch (error) {
      return { status: 500, message: error,Id:documentID };
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
     

      async getAllDocuments(collectionName) {
        try {
          // Reference to the collection
          const collectionRef = collection(db, collectionName);
      
          // Create a query with orderBy for sorting by date
                   
          const q = collectionName === "Users" ? collectionRef :  query(collectionRef,
            orderBy(new FieldPath('data', 'CreatedAt'), 'desc'),
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