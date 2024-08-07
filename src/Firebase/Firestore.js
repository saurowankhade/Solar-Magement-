import { db } from "./firebase";
import { collection, deleteDoc, doc,FieldPath,getDoc, getDocs ,limit,orderBy,query,setDoc, startAfter, startAt, Timestamp, updateDoc, where } from "firebase/firestore";
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
          const q = query(collectionRef,
            orderBy(new FieldPath('data', 'CreatedAt'), 'desc'),
          ); // Use FieldPath for nested fields
      
          // Get the documents based on the query
          const snapshot = await getDocs(q);
          
          if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
          }
      
          // Map document data
          const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log(documents);
          
          return documents;
        } catch (error) {
          console.error('Error fetching documents:', error);
          return [];
        }
      }


    async getAllData(collectionName,lastDoc,preData){
      const collectionRef = collection(db, collectionName);

      console.log(collectionRef);
  
      let q = query(
        collectionRef,
        orderBy(new FieldPath('data', 'CreatedAt'), 'desc'),
        startAfter(lastDoc || 0),
        limit(25)
      );
      const snapshot = await getDocs(q);
      const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // console.log("Last DOcs : ",lastDoc);
      return { data:[...preData || [],...documents], lastDocs: snapshot.docs[snapshot.docs.length - 1] };
    }

     getAllSearch = async (collectionName,conditions) => {
      try{
        let query = db.collection(collectionName);
        conditions.forEach(condition => {
          query = query.where(condition?.field, condition?.operator, condition?.value);
        });
      const snapshot = await query.get();
      const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(results);
      return results;
      } catch(error){
        console.log(error);
        return {status:500,message:error}
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
      return timestamp.toDate().toUTCString(); // Or any other format you prefer
    }
    return ''; // Return empty string if not a valid timestamp
  }
      
}

const firestore = new Firestore();
export default firestore;