const ControlPanel = ({
  generateArray,
  startSort,
  speed,
  setSpeed,
  algorithm,
  setAlgorithm,
  arraySize,
  setArraySize,
  isSorting,
  isPaused,
  setIsPaused
}) => {

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 mb-6 text-white bg-gray-900 p-4 rounded-lg shadow-md">

      {/* Algorithm Selector */}
      <select
        value={algorithm}
        disabled={isSorting}
        onChange={(e) => setAlgorithm(e.target.value)}
        className="px-4 py-2 bg-gray-800 rounded"
      >
        <option value="bubble">Bubble Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="merge">Merge Sort</option>
      </select>

      {/* Generate */}
      <button
        onClick={generateArray}
        disabled={isSorting}
        className="px-4 py-2 bg-blue-600 rounded disabled:bg-gray-600"
      >
        Generate
      </button>

      {/* Start */}
      <button
        onClick={startSort}
        disabled={isSorting}
        className="px-4 py-2 bg-green-600 rounded disabled:bg-gray-600"
      >
        Start
      </button>

      {/* Pause / Resume */}
      <button
        onClick={() =>
          setIsPaused(prev => !prev)
        }
        disabled={!isSorting}
        className="px-4 py-2 bg-yellow-600 rounded disabled:bg-gray-600"
      >
        {isPaused ? "Resume" : "Pause"}
      </button>

      {/* Speed Control */}
      <div className="flex items-center gap-2">
        <span>Speed</span>
        <input
          type="range"
          min="10"
          max="200"
          value={speed}
          disabled={!isSorting && false}
          onChange={(e) =>
            setSpeed(Number(e.target.value))
          }
        />
      </div>

      {/* Array Size */}
      <div className="flex items-center gap-2">
        <span>Size</span>
        <input
          type="range"
          min="10"
          max="120"
          value={arraySize}
          disabled={isSorting}
          onChange={(e) =>
            setArraySize(Number(e.target.value))
          }
        />
      </div>

    </div>
  );
};

export default ControlPanel;