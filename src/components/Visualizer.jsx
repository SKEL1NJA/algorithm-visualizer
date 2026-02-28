import { useState, useRef, useEffect } from "react";

import { bubbleSort } from "../algorithms/sorting/bubbleSort";
import { selectionSort } from "../algorithms/sorting/selectionSort";
import { mergeSort } from "../algorithms/sorting/mergeSort";
import { quickSort } from "../algorithms/sorting/quickSort";
import { heapSort } from "../algorithms/sorting/heapSort";

import { linearSearch } from "../algorithms/searching/linearSearch";
import { binarySearch } from "../algorithms/searching/binarySearch";

import ControlPanel from "./ControlPanel";
import AlgorithmInfo from "./AlgorithmInfo";

const Visualizer = () => {

  // ================= ARRAY CREATION =================
  const createArray = (size) =>
    Array.from(
      { length: size },
      () => Math.floor(Math.random() * 100) + 5
    );

  // ================= STATES =================
  const [arraySize, setArraySize] = useState(40);
  const [array, setArray] = useState(() =>
    createArray(40)
  );

  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const [target, setTarget] = useState(50);
  const [foundIndex, setFoundIndex] = useState(null);

  const [speed, setSpeed] = useState(60);
  const [algorithm, setAlgorithm] = useState("bubble");

  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // ================= PAUSE REF =================
  const pauseRef = useRef(false);

  useEffect(() => {
    pauseRef.current = isPaused;
  }, [isPaused]);

  // ================= ALGORITHM ROUTER =================
  const algorithms = {
    bubble: bubbleSort,
    selection: selectionSort,
    merge: mergeSort,
    quick: quickSort,
    heap: heapSort,
    linear: linearSearch,
    binary: binarySearch
  };

  // ================= GENERATE ARRAY =================
  const generateArray = () => {
    if (isSorting) return;

    setArray(createArray(arraySize));
    setSortedIndices([]);
    setActiveIndices([]);
    setFoundIndex(null);
  };

  // ================= START EXECUTION =================
  const startSort = async () => {

    if (isSorting) return;

    setIsSorting(true);
    setFoundIndex(null);

    const controls = {
      get paused() {
        return pauseRef.current;
      }
    };

    const selectedAlgorithm =
      algorithms[algorithm];

    if (!selectedAlgorithm) return;

    // ---------- SEARCHING ----------
    if (
      algorithm === "linear" ||
      algorithm === "binary"
    ) {

      let workingArray = [...array];

      // Binary search requires sorted data
      if (algorithm === "binary") {
        workingArray.sort((a, b) => a - b);
        setArray([...workingArray]);
      }

      await selectedAlgorithm(
        workingArray,
        target,
        setActiveIndices,
        setFoundIndex,
        speed,
        controls
      );

    } 
    // ---------- SORTING ----------
    else {

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

  // ================= UI =================
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
        target={target}
        setTarget={setTarget}
        isSorting={isSorting}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />

      {/* ================= VISUAL AREA ================= */}
      <div className="w-full max-w-6xl h-[70vh] border border-gray-700 rounded-lg flex items-end justify-center gap-1 p-4">

        {array.map((value, index) => {

          let color = "bg-blue-500";

          if (index === foundIndex)
            color = "bg-yellow-400";
          else if (sortedIndices.includes(index))
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