import { useRef, useState } from 'react';

import authentication from '../../Firebase/authentication';

import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setItem } from '../../utils/LocalStorage/localAuth';

// eslint-disable-next-line react/display-name, react/prop-types
const SigninForm =({isCmpLogin})=>{

  const [error,setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigateToDashboard = useNavigate();


  const handleButtonClick = (event)=>{
    event.preventDefault();
    toast.dismiss()
    
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if(password.length <=7) setError("Password must be greater than 7!")
    else {
    setIsLoading(true)
    authentication.LoginEmailAndPassword(email,password)
    .then((check)=>{
      setIsLoading(false);
      if(check?.status === 200 || check?.message === "Done"){
        toast.success("Login Successfully!",{position:'top-center'});
        setItem("isLogin",{isLogin:true,userID:check?.userId})
        navigateToDashboard('/dashboard');
      } else{
        toast.error(`Login Failed ${check?.message}`,{position:'bottom-center'})
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
                    Already Have an account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleButtonClick}>
        
                    <div>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Email" required ref={emailRef}/>
                    </div>
                
                    <div>
                       <input type="password" name="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required ref={passwordRef} onChange={()=>{setError("")}}/>
                       {
                          error==="" ? <></> : <span className='p-2 text-[red] font-mono'>{error}</span>
                         }
                    </div>
                    
                    <div type='submit' className='flex items-center justify-center '>
                         
                    {
                      isLoading ? 
                      <ReactLoading type='spinningBubbles' color='black' height={'10%'} width={'10%'} /> 
                      : 
                      <button className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 hover:cursor-pointer' type="submit">Login</button>
                    }

                    </div>

                    <p className="text-sm font-light text-gray-500 ">
                        Create new account? <a href={isCmpLogin ? "/company-signup" : "/user-signup"} className="font-medium text-primary-600 hover:underline ">New Account</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
  )


};

export default SigninForm;
