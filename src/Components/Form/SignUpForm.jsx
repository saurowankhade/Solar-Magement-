import { useEffect, useRef, useState } from 'react';

import authentication from '../../Firebase/authentication';

import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { setItem } from '../../utils/LocalStorage/localAuth';
import { useNavigate } from 'react-router-dom';
import firestore from '../../Firebase/Firestore';

// eslint-disable-next-line react/display-name
const SignUpForm =(props)=>{
  // eslint-disable-next-line react/prop-types
  const {isCmpReg} = props;

  const [error,setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  // 

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileNoRef = useRef(null);
  const passwordRef = useRef(null);
  const rePasswordRef = useRef(null);
  const companyIDRef = useRef(null);
  const jobProfileRef = useRef(null);

  const navigateToDashboard = useNavigate();

  const [companyIds,setCompanyIds] = useState([]);

  useEffect(()=>{
    firestore.getCompanyIds()
    .then((data)=>{
      setCompanyIds(data.map((onlyIds)=> onlyIds?.id))
    });
    
  },[])
  


  const handleButtonClick = (event)=>{
    event.preventDefault();
    setError('')
    const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    let ranStr = "";
    for(let i=0;i<=4;i++){
      ranStr+=str.charAt(Math.floor(Math.random()*str.length + 1));
    }
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const mobileNo = mobileNoRef.current.value;
    const jobProfile = jobProfileRef.current.value;
    const password = passwordRef.current.value;
    const rePassword = rePasswordRef.current.value;
    const verified = isCmpReg ? true : false;
    const companyID = isCmpReg ? mobileNo+ranStr : companyIDRef.current.value;

    if(!companyIds.includes(companyID) && !isCmpReg){
      setError("Check Company Id")
    }
    else if(password.length <=7) setError("Password must be greater than 7!")
    else if(password !== rePassword) setError("Password not match!")
    else {
    setIsLoading(true)
    authentication.RegisterEmailAndPassword(email,password,name,mobileNo,jobProfile,verified,companyID,isCmpReg)
    .then((check)=>{
      setIsLoading(false);
      if(check?.status === 200 || check?.message === "Done"){
        toast.success("Registration Successfully !",{position:'top-center'});
        setItem("isLogin",{isLogin:true,userID:check?.userId})
        navigateToDashboard('/dashboard');
      } else{
        toast.error(`Registration  Failed ${check?.message}`,{position:'bottom-center'})
      }
    });
  }    
    
  }
  return(
    <section className="bg-gray-50">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
       
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Create an account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleButtonClick}>
                <div>
                        <input type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Name" required ref={nameRef}/> 

                    </div>

                    <div>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Email" required ref={emailRef}/>
                    </div>
                    <div>
                        <input type="tel" name="number" id="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Mobile No" maxLength={10} minLength={10} required ref={mobileNoRef}/>
                    </div>

                   {
                    isCmpReg ? <></> :  <div>
                    <input type="text" name="cmpId" id="cmpId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Company ID" required ref={companyIDRef} />
                    </div>
                   }


                    <div>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="job-profile" id="job-profile" ref={jobProfileRef}>     
                      {
                        isCmpReg ? <option value="Admin">Admin</option>
                        :<><option value="Admin">Admin</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Team Leader">Team Leader</option></>
                      }
                    </select>
                    </div>

                    <div>
                       <input type="password" name="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required ref={passwordRef} onChange={()=>{setError("")}}/>

                    </div>
                    <div>
                         <input type="password" name="confirm-password" id="confirm-password" placeholder="Retype Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2" required ref={rePasswordRef} onChange={()=>{setError("")}}/>
                         {
                          error==="" ? <></> : <span className='p-2 text-[red] font-mono'>{error}</span>
                         }
                    </div>

                    <div type='submit' className='flex items-center justify-center r'>
                      
                    
                    {
                      isLoading  ? <ReactLoading type='spinningBubbles' color='black' height={'10%'} width={'10%'} /> : 
                      <button className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 hover:cursor-pointe' type="submit">Create an account</button>
                    }

                    </div>

                  {
                    isCmpReg ? <></> : 
                    <p className="text-sm font-light text-gray-500 ">
                        Already have an account? <a href={"/user-signin"} className="font-medium text-primary-600 hover:underline ">Login here</a>
                    </p>
                  }
                </form>
            </div>
        </div>
    </div>
  </section>
  )


};

export default SignUpForm;
