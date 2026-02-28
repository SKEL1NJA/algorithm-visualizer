import { useState, useRef, useEffect } from "react";
import { bubbleSort } from "../algorithms/sorting/bubbleSort";
import { selectionSort } from "../algorithms/sorting/selectionSort";
import { mergeSort } from "../algorithms/sorting/mergeSort";
import { quickSort } from "../algorithms/sorting/quickSort";
import { heapSort } from "../algorithms/sorting/heapSort";

import ControlPanel from "./ControlPanel";
import AlgorithmInfo from "./AlgorithmInfo";

const Visualizer = () => {

  const createArray = (size) =>
    Array.from(
      { length: size },
      () => Math.floor(Math.random() * 100) + 5
    );

  const [arraySize, setArraySize] = useState(40);
  const [array, setArray] = useState(() => createArray(40));
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const [speed, setSpeed] = useState(60);
  const [algorithm, setAlgorithm] = useState("bubble");

  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const pauseRef = useRef(false);

  useEffect(() => {
    pauseRef.current = isPaused;
  }, [isPaused]);

  // ✅ Algorithm Router (SCALABLE)
  const algorithms = {
    bubble: bubbleSort,
    selection: selectionSort,
    merge: mergeSort,
    quick: quickSort,
    heap: heapSort
  };

  const generateArray = () => {
    if (isSorting) return;

    setArray(createArray(arraySize));
    setSortedIndices([]);
    setActiveIndices([]);
  };

  const startSort = async () => {

    if (isSorting) return;

    setIsSorting(true);

    const controls = {
      get paused() {
        return pauseRef.current;
      }
    };

    const selectedAlgorithm =
      algorithms[algorithm];

    if (selectedAlgorithm) {
      await selectedAlgorithm(
        array,
        setArray,
        setActiveIndices,
        setSortedIndices,
        speed,
        controls
      );
    }

    setIsPaused(false);
    setIsSorting(false);
  };

  return (
    <div className="flex flex-col items-center bg-gray-950 min-h-screen p-6">

      <AlgorithmInfo algorithm={algorithm} />

      <ControlPanel
        generateArray={generateArray}
        startSort={startSort}
        speed={speed}
        setSpeed={setSpeed}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        arraySize={arraySize}
        setArraySize={setArraySize}
        isSorting={isSorting}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />

      <div className="w-full max-w-6xl h-[70vh] border border-gray-700 rounded-lg flex items-end justify-center gap-1 p-4">

        {array.map((value, index) => {

          let color = "bg-blue-500";

          if (sortedIndices.includes(index))
            color = "bg-green-500";
          else if (activeIndices.includes(index))
            color = "bg-red-500";

          return (
            <div
              key={index}
              className={`transition-all duration-100 ${color}`}
              style={{
                height: `${value}%`,
                width: `${600 / arraySize}px`
              }}
            />
          );
        })}

      </div>
    </div>
  );
};

export default Visualizer;