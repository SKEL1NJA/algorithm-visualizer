const ControlPanel = ({
  generateArray,
  startSort,
  speed,
  setSpeed,
  isSorting,
  algorithm,
  setAlgorithm
}) => {

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6 text-white">

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

      <button
        onClick={generateArray}
        disabled={isSorting}
        className="px-6 py-2 bg-blue-600 rounded disabled:bg-gray-600"
      >
        Generate Array
      </button>

      <button
        onClick={startSort}
        disabled={isSorting}
        className="px-6 py-2 bg-green-600 rounded disabled:bg-gray-600"
      >
        Start Sorting
      </button>

      <div>
        Speed
        <input
          type="range"
          min="10"
          max="200"
          value={speed}
          disabled={isSorting}
          onChange={(e) =>
            setSpeed(Number(e.target.value))
          }
          className="ml-2"
        />
      </div>

    </div>
  );
};

export default ControlPanel;