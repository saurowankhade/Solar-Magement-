const Home = ()=>{
    return (
       <div className="flex flex-col justify-center items-center w-full h-[100svh] ">
        <div className="flex flex-row">
        <button className="w-[300px] mt-3 ml-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 hover:cursor-pointer" type="button" onClick={()=>{window.location.href = "/user-signup"}}>User Register</button>
        <button className="w-[300px] mt-3 ml-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 hover:cursor-pointer" type="button" onClick={()=>{window.location.href = "/user-signin"}}>User Login</button>
        </div>
        <div className="flex flex-row">
        <button className="w-[300px] mt-3 ml-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 hover:cursor-pointer" type="button" onClick={()=>{window.location.href = "/company-signup"}}>Company Register</button>
       
        </div>
    </div>
    )
}

export default Home