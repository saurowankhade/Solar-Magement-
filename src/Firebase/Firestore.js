import { db } from "./firebase";
import { collection, deleteDoc, doc,getDoc, getDocs ,setDoc, updateDoc } from "firebase/firestore";
import authentication from "./authentication";
import { toast } from "react-toastify";
class Firestore {

  async addData(collection,data,documentID){
    
    try{
      setDoc(doc(db,collection,documentID),{data}).then(()=>{
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
          console.error("Error getting document: ", error);
        }
      }

      async getAllDocuments(collectionName) {
        const collectionRef = collection(db, collectionName);
        const snapshot = await getDocs(collectionRef);
        const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return documents;
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
      
}

const firestore = new Firestore();
export default firestore;