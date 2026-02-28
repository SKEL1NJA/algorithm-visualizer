import { useState, useEffect } from "react";

const Visualizer = () => {
  const [array, setArray] = useState([]);

  // Generate random array
  const generateArray = () => {
    const newArray = [];

    for (let i = 0; i < 40; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 5);
    }

    setArray(newArray);
  };

  // Run once on load
  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  generateArray();
}, []);

  return (
    <div className="flex flex-col items-center bg-gray-950 h-[80vh] p-6">
      
      <button
        onClick={generateArray}
        className="mb-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Generate New Array
      </button>

      <div className="w-full max-w-6xl h-full border border-gray-700 rounded-lg flex items-end justify-center gap-1 p-4">
        {array.map((value, index) => (
          <div
            key={index}
            className="bg-blue-500 w-4"
            style={{ height: `${value}%` }}
          />
        ))}
      </div>

    </div>
  );
};

export default Visualizer;