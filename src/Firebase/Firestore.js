import { db } from "./firebase";
import { collection, deleteDoc, doc,FieldPath,getDoc, getDocs ,orderBy,query,setDoc, Timestamp, updateDoc } from "firebase/firestore";
import authentication from "./authentication";
import { toast } from "react-toastify";
import { setItem } from "../utils/LocalStorage/localAuth";

class Firestore {

  async addData(collection,data,documentID){
    
    try{
      setDoc(doc(db,collection,documentID),{data})
      .then(()=>{
        toast.success("Data Added!");
    });
    } catch(error){
      console.log("error",error);

      toast.error(error,{position:"bottom-center"});
    }
  }


      async getUserData ()  {
        try {
          const docRef = doc(db, "Users", authentication.userID());
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

     

      async getAllDocuments(collectionName) {
        try {
          // Reference to the collection
          const collectionRef = collection(db, collectionName);
      
          // Create a query with orderBy for sorting by date
          const q = query(collectionRef, orderBy(new FieldPath('data', 'PrimaryInfromationDate'), 'desc')); // Use FieldPath for nested fields
      
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
      await deleteDoc(documentRef).then(()=>{
        toast.success("Deleted !!")
      }).catch((error)=>{
        toast.error(error.message)
      })
    } catch (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  }

   // Update a document by ID
   async updateDocument(collectionName, documentId, updatedData) {
    try {
      const documentRef = doc(db, collectionName, documentId);
      await updateDoc(documentRef, updatedData);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }


   formatTimestamp(timestamp) {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toLocaleDateString(); // Or any other format you prefer
    }
    return ''; // Return empty string if not a valid timestamp
  }
      
}

const firestore = new Firestore();
export default firestore;