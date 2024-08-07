import 'react-toastify/dist/ReactToastify.css';
import { auth ,db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword ,signOut,sendPasswordResetEmail,sendEmailVerification} from "firebase/auth"; 
import { setDoc,doc } from "firebase/firestore";

import { getItem } from "../utils/LocalStorage/localAuth";

const KEY_VAULE = "isLogin";
class Authentication  {

    async RegisterEmailAndPassword(email,password,name,mobileNo,jobProfile,verified,companyID,isCmp){ 
      try{
        const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;
            if(user){
               setDoc(doc(db,"Users",user.uid),{
                name:name,
                mobileNo:mobileNo,
                email:email,
                jobProfile:jobProfile,
                verified:verified,
                companyID:companyID,
                userID:user.uid,
                userImg:"",
                mobileNoVerify:false,
                isCmp:isCmp
               });

               return {status:200,message:"Done",userId:user?.uid};

            }
      } catch(error){
        return {status:500,message:error};
      }
    }

    async LoginEmailAndPassword(email,password){
        try{
              const data = await signInWithEmailAndPassword(auth,email,password)
              // console.log(data);
              
              return {status:200,message:"Done",userId:data?.user?.uid};
        } catch(error){
            return {status:500,message:error};
        }
    }


  // Sign Out
  async signout() {
    try {
        await signOut(auth)
        return {status:200,message:"Done"};
    } 
    catch(error){
        return {status:500,message:error};
      }
  }

  // Password Reset
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email)
      return {status:200,message:"Done"};
    }catch(error){
      return {status:500,message:error};
    }
  }


  isLogin(){
    const userData = getItem(KEY_VAULE);
    return userData.isLogin;
  }

  userID(){
    const userData = getItem(KEY_VAULE);
    return userData.userID;
  }

}



const authentication = new Authentication();

export default authentication;