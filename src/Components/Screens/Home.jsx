const Home = ()=>{
    return (
       <div className="flex  justify-center items-center mx-5 sm:mx-16 md:mx-36 h-svh ">
        <div className="flex w-full flex-col gap-2 flex-wrap justify-between items-center">
        <button className="w-full mt-3 ml-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 hover:cursor-pointer" type="button" onClick={()=>{window.location.href = "/company-signup"}}>Company Register</button>
        <div className="flex w-full justify-between items-center">
        <button className="w-full mt-3 ml-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 hover:cursor-pointer" type="button" onClick={()=>{window.location.href = "/user-signin"}}>User Login</button>
        <button className="w-full mt-3 ml-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 hover:cursor-pointer" type="button" onClick={()=>{window.location.href = "/user-signup"}}>User Register</button>
        </div>
        </div>
    </div>
    )
}

export default Home