const ControlPanel = ({
  generateArray,
  startSort,
  speed,
  setSpeed,
  algorithm,
  setAlgorithm,
  arraySize,
  setArraySize,
  target,
  setTarget,
  isSorting,
  isPaused,
  setIsPaused
}) => {

  const isSearching =
    algorithm === "linear" ||
    algorithm === "binary";

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 mb-6 text-white bg-gray-900 p-4 rounded-lg shadow-md">

      {/* ================= ALGORITHM SELECT ================= */}
      <select
        value={algorithm}
        disabled={isSorting}
        onChange={(e) => setAlgorithm(e.target.value)}
        className="px-4 py-2 bg-gray-800 rounded"
      >
        <optgroup label="Sorting">
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="heap">Heap Sort</option>
        </optgroup>

        <optgroup label="Searching">
          <option value="linear">Linear Search</option>
          <option value="binary">Binary Search</option>
        </optgroup>
      </select>

      {/* ================= GENERATE ================= */}
      <button
        onClick={generateArray}
        disabled={isSorting}
        className="px-4 py-2 bg-blue-600 rounded disabled:bg-gray-600"
      >
        Generate
      </button>

      {/* ================= START ================= */}
      <button
        onClick={startSort}
        disabled={isSorting}
        className="px-4 py-2 bg-green-600 rounded disabled:bg-gray-600"
      >
        Start
      </button>

      {/* ================= PAUSE ================= */}
      <button
        onClick={() => setIsPaused(prev => !prev)}
        disabled={!isSorting}
        className="px-4 py-2 bg-yellow-600 rounded disabled:bg-gray-600"
      >
        {isPaused ? "Resume" : "Pause"}
      </button>

      {/* ================= TARGET INPUT ================= */}
      {isSearching && (
        <div className="flex items-center gap-2">
          <span>Target</span>
          <input
            type="number"
            value={target}
            disabled={isSorting}
            onChange={(e) =>
              setTarget(Number(e.target.value))
            }
            className="w-20 px-2 py-1 bg-gray-800 rounded"
          />
        </div>
      )}

      {/* ================= SPEED ================= */}
      <div className="flex items-center gap-2">
        <span>Speed: {speed}</span>
        <input
          type="range"
          min="10"
          max="200"
          value={speed}
          onChange={(e)=>
            setSpeed(Number(e.target.value))
          }
        />
      </div>

      {/* ================= SIZE ================= */}
      <div className="flex items-center gap-2">
        <span>Size: {arraySize}</span>
        <input
          type="range"
          min="10"
          max="120"
          value={arraySize}
          disabled={isSorting}
          onChange={(e)=>
            setArraySize(Number(e.target.value))
          }
        />
      </div>

    </div>
  );
};

export default ControlPanel;