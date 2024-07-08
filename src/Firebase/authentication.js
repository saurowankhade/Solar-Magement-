import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { auth ,db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword ,signOut,sendPasswordResetEmail,sendEmailVerification} from "firebase/auth"; 
import { setDoc,doc } from "firebase/firestore";

import { setItem,getItem } from "../utils/LocalStorage/localAuth";

const KEY_VAULE = "isLogin";
class Authentication  {

    async RegisterEmailAndPassword(email,password,name,mobileNo,jobProfile,verified,companyID,isCmp){
        toast.success("Register Success ",{position:'top-center'})
      try{
        await createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
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
               }).then(()=>{
                toast.success("Register Success ",{position:'top-center'})
                window.location.href = "/dashboard"
                setItem(KEY_VAULE,{isLogin:true,userID:user.uid,cmpID:companyID }); // atLocal Storage
               }).catch((error)=>{
                console.log(error.message);
               });
            }
         }).catch((error)=>{
            console.log("Register failed : ",error.message);
            
        toast.error(error.message,{position:'bottom-center'})
         });
      } catch(error){
        toast.error(error.message,{position:'bottom-center'})
      }
    }

    async LoginEmailAndPassword(email,password){
        try{
             await signInWithEmailAndPassword(auth,email,password)
             .then((userCredential)=>{
                const user = userCredential.user;
                toast.success("Login Sccessfully!",{position:'top-center'});
                window.location.href = '/dashboard';
                setItem(KEY_VAULE,{isLogin:true,userID:user.uid}); // atLocal Storage
            }).catch((error)=>{
                toast.error(`Login Failed ${error.message}`,{position:'bottom-center'})
            });
        } catch(error){
            toast(`Failed : ${error.message}`,{position:'bottom-center'})
        }
    }


  // Sign Out
  async signout() {
      await signOut(auth).then(()=>{
        toast.success("Sign Out",{position:'top-center'});
        window.location.href = '/';
        setItem(KEY_VAULE,{isLogin:false,userID:""})
      }).catch((error)=>{
        toast.error(error.message,{position:'bottom-center'})
      });
  }

  // Password Reset
  async resetPassword(email) {
      await sendPasswordResetEmail(auth, email).then(()=>{
        toast.success("Email send check your email please !",{position:'top-right'})
      }).catch((error)=>{
        toast.error(error.message,{position:'bottom-center'})
      })
  }


  isLogin(){
    const userData = getItem(KEY_VAULE);
    return userData.isLogin;
  }

  userID(){
    const userData = getItem(KEY_VAULE);
    return userData.userID;
  }

  isShowCmpID(){
    const userData = getItem(KEY_VAULE);
    return userData.showCmpID;
  }

}



const authentication = new Authentication();

export default authentication;