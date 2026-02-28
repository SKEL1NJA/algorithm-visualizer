import { useState } from "react";
import { bubbleSort } from "../algorithms/sorting/bubbleSort";
import ControlPanel from "./ControlPanel";

const Visualizer = () => {

  const createArray = () => {
    const arr = [];
    for (let i = 0; i < 40; i++) {
      arr.push(Math.floor(Math.random() * 100) + 5);
    }
    return arr;
  };

  const [array, setArray] = useState(createArray);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [speed, setSpeed] = useState(60);
  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState("bubble");

  const generateArray = () => {
    if (isSorting) return;
    setArray(createArray());
    setSortedIndices([]);
  };

  const startSort = async () => {
    setIsSorting(true);

    if (algorithm === "bubble") {
      await bubbleSort(
        array,
        setArray,
        setActiveIndices,
        setSortedIndices,
        speed
      );
    }

    setIsSorting(false);
  };

  return (
    <div className="flex flex-col items-center bg-gray-950 h-[80vh] p-6">

      <ControlPanel
        generateArray={generateArray}
        startSort={startSort}
        speed={speed}
        setSpeed={setSpeed}
        isSorting={isSorting}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
      />

      <div className="w-full max-w-6xl h-full border border-gray-700 rounded-lg flex items-end justify-center gap-1 p-4">

        {array.map((value, index) => {

          let color = "bg-blue-500";

          if (sortedIndices.includes(index))
            color = "bg-green-500";
          else if (activeIndices.includes(index))
            color = "bg-red-500";

          return (
            <div
              key={index}
              className={`w-4 transition-all duration-100 ${color}`}
              style={{ height: `${value}%` }}
            />
          );
        })}

      </div>
    </div>
  );
};

export default Visualizer;