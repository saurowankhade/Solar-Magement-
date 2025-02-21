import { useState, forwardRef, useEffect } from 'react';

const Dropdown = forwardRef(({ isReturn = false ,placeholder, className, list }, ref) => {
    const constList = list;
  const [filteredOptions, setFilteredOptions] = useState(list || []);  // State for filtered options
  const [showOptions, setShowOptions] = useState(false);  // State for displaying options

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    
    setFilteredOptions(constList.filter((option) => option.toLowerCase().includes(query)));
  };
  useEffect(()=>{
    setFilteredOptions(list || [])
  },[list])
  const handleOptionClick = (option) => {
    ref.current.value = option;
    setShowOptions(false);
  };

  return (
    <div className={`w-full custom-dropdown ${className}`}>
      <input
        className="w-full my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none text-base"
        placeholder={placeholder}
        type="text"
        ref={ref}
        disabled={isReturn}
        onClick={()=>{setShowOptions(!showOptions)}}
        onChange={handleInputChange}
        onBlur={() => setTimeout(() => setShowOptions(false), 100)}
      />
      {(showOptions && filteredOptions && filteredOptions.length > 0) && (
        <ul className={`border px-2 w-[400px] ${filteredOptions.length > 5 ? 'h-32' : ''}  overflow-x-hidden  shadow-sm absolute z-50 bg-white overflow-y-auto rounded-md `}>
          {filteredOptions.map((option, index) => (
            <li key={index+option} className="px-3 cursor-pointer border-b py-1 break-words w-full " onMouseDown={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

// Set displayName for debugging in React DevTools
Dropdown.displayName = 'Dropdown';

export default Dropdown;
