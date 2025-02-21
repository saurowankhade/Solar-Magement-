import { useEffect, useState } from "react";

const MaterialReturnTableUI = ({ materialDetails, setMaterialDetails }) => {
  const [quantities, setQuantities] = useState(
    materialDetails.map((material) => material.Quantity || "")
  );

  const handleQuantityChange = (e, index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = e.target.value;
    setQuantities(updatedQuantities);
  };

  // Auto-update materialDetails whenever quantities change
  useEffect(() => {
    const updatedMaterials = materialDetails.map((material, index) => ({
      ...material,
      Quantity: quantities[index], // Update quantity in materialDetails
    }));

    setMaterialDetails(
        updatedMaterials
    );
  }, [materialDetails, quantities, setMaterialDetails]); // Runs every time quantities change

  return (
    <div className="relative overflow-x-auto shadow-md border">
      <table className="w-full overflow-x-auto text-sm text-left text-gray-500 border">
        <thead className="text-xs text-gray-700 uppercase border">
          <tr>
            <th scope="col" className="px-6 py-3 font-bold">Material</th>
            <th scope="col" className="px-6 py-3 font-bold">Unit</th>
            <th scope="col" className="px-6 py-3 font-bold">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {materialDetails.map((material, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="px-6 py-4">{material?.Material}</td>
              <td className="px-6 py-4">{material?.Unit}</td>
              <td className="px-6 py-4">
                <input
                  className="w-full border p-2"
                  type="number"
                  placeholder="Quantity"
                  maxLength={3}
                  value={quantities[index]}
                  onChange={(e) => handleQuantityChange(e, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialReturnTableUI;
