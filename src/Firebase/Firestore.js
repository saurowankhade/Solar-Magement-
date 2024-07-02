import { db } from "./firebase";
import { doc,getDoc } from "firebase/firestore";
// import authentication from "./authentication";
class Firestore {
      async getUserData ()  {
        try {
          const docRef = doc(db, "Users", "AaiVtka4pehuccazl4xmxppXAHg2");
          const docSnap = await getDoc(docRef);
          return docSnap.exists() ? docSnap.data() : ""
        } catch (error) {
          console.error("Error getting document: ", error);
        }
      }
}

const firestore = new Firestore();
export default firestore;