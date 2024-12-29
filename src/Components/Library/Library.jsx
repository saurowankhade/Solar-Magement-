import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../Context/UserContext/UserContext";
import { toast } from "react-toastify";
import firestore from "../../Firebase/Firestore";
import Loading from "react-loading";
import Dropdown from "../MaterialComponent/PrimaryInfo/DropDown";

const Library = () => {

    const [action, setAction] = useState("Add");
    const actionArray = ["Add", "Delete"]

    const [selectInput, setSelectInput] = useState("Team Name");
    const selectInputArray = ["Team Name","Driver Name", "Vehicle Name", "Structure Material", "Electric Fitting Material", "Concrete Material", "Units"]

    const [alreadyData, setAlreadyData] = useState([]);

    const inputText = useRef();
    const elementToDel = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const [allData,setAllData] = useState([]);

    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user?.companyID) {
            firestore.getOneData("Library", user?.companyID)
                .then((cre) => {
                    const inputData = cre?.[selectInput]
                    setAllData(cre);
                    setAlreadyData(inputData || []);
                })
        }

    }, [selectInput, user?.companyID])


    const handleSubmit = () => {
        setIsLoading(true)
        if (action.toString() === actionArray[0] && (inputText.current.value).length >= 0) {
            console.log(allData," is lenght");
            
            if(Object.keys(allData).length > 0){
                console.log(alreadyData);
                
                firestore.updateData("Library", { ...allData, [selectInput]: [...alreadyData || [], inputText.current.value] }, user?.companyID)
                .then((cre) => {
                    if (cre.status === 200) {
                        setIsLoading(false)
                        toast.success(`${selectInput} is added`)
                        setAlreadyData([...alreadyData, inputText.current.value])
                        inputText.current.value = ""
                    } else {
                        setIsLoading(false)
                        toast.error(`${selectInput} is failed to add`)
                        console.log(cre?.message);
                        
                        
                    }
                });
            } else{
                firestore.addData("Library", {...allData, [selectInput]: [...alreadyData || [], inputText.current.value] }, user?.companyID)
                .then((cre) => {
                    if (cre.status === 200) {
                        setIsLoading(false)
                        toast.success(`${selectInput} is added`)
                        setAlreadyData([...alreadyData, inputText.current.value])
                        inputText.current.value = ""
                    } else {
                        setIsLoading(false)
                        toast.error(`${selectInput} is failed to add`)
                        console.log(cre?.message);
                        
                        
                    }
                });
            }


        } else if (action === actionArray[0]) {
            toast.info("Enter text")
        }
        //delete
        else if (action === actionArray[1]) {
            removeItem(elementToDel.current.value)

        }

    }
    const removeItem = (selectedItem) => {
        // Check if the item exists in the state array
        if (alreadyData.includes(selectedItem)) {
            // Remove the item and update the state
            const updatedData = alreadyData.filter((item) => item !== selectedItem);
            firestore.updateData("Library", { [selectInput]: [...updatedData] }, user?.companyID)
                .then((cre) => {
                    if (cre.status === 200) {
                        setAlreadyData(updatedData);
                        setIsLoading(false)
                        toast.success(`${selectInput} is deleted`)
                        elementToDel.current.value = ""
                    } else {
                        setIsLoading(false)
                        console.log(cre.message);
                        toast.error(`${selectInput} is failed to delete`)
                    }
                })

        } else {
            toast.error(`"${selectedItem}" does not exist.`)
        }
    };


    return (
        <div className="primaryInformation  mx-auto   my-40 px-5 sm:px-10 md:px-16 lg:px-32 md:w-[900px]">
            <div id="mainInformation" className="shadow-md p-2 border rounded-lg">
                <h2 className="text-center font-bold">Company Details</h2>

                <div className="w-full justify-end items-end my-2">
                    <div className=" w-fit border rounded-full flex items-center py-2 gap-1 px-2 justify-center ">
                        <div className="w-full ">Action : </div>
                        <select className="outline-none cursor-pointer text-base w-fit  sm:w-fit" name="documents" id="documents" value={action} onChange={(e) => { setAction(e.target.value) }}  >
                            {

                                !actionArray.includes(action) && (
                                    <option className="cursor-pointer text-lg" key={action} value={action}>
                                        {action}
                                    </option>
                                )

                            }
                            {
                                actionArray.map((document) => (
                                    <option className="cursor-pointer" key={document} value={document}>
                                        {document}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>


                <div className="w-full justify-center my-2">
                    <div className=" w-full border rounded-full flex items-center py-2 gap-1 px-2 justify-between  ">
                        <select className="outline-none cursor-pointer text-base w-full  sm:w-full" name="documents" id="documents" value={selectInput} onChange={(e) => { setSelectInput(e.target.value) }}  >
                            {

                                !selectInputArray.includes(selectInput) && (
                                    <option className="cursor-pointer text-lg" key={selectInput} value={selectInput}>
                                        {selectInput}
                                    </option>
                                )

                            }
                            {
                                selectInputArray.map((document) => (
                                    <option className="cursor-pointer" key={document} value={document}>
                                        {document}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>


                <div className=" flex flex-col ">
                    {
                        action === "Add" ? <input className=" py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none   text-base" placeholder={`Enter ${selectInput}`} type="text" ref={inputText} /> :
                            action === "Delete" ?
                                <>
                                    <Dropdown placeholder={selectInput} list={alreadyData} ref={elementToDel} />


                                </> : <></>
                    }

                </div>


                <div className="flex w-full justify-center mt-8">
                    {
                        isLoading ? <Loading type='spinningBubbles' color='#3b82f6' height={'10%'} width={'10%'} /> :
                            <button className="bg-blue-500 text-white rounded-full cursor-pointer px-4 py-1 text-lg shadow-xl"
                                onClick={handleSubmit}>{action}</button>
                    }
                </div>

            </div>
        </div>
    )
}

export default Library
