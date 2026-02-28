const Visualizer = () => {
  return (
    <div className="flex justify-center items-end h-[80vh] bg-gray-950 p-6">
      
      {/* Visualization Area */}
      <div className="w-full max-w-6xl h-full border border-gray-700 rounded-lg flex items-end justify-center gap-1 p-4">
        
        {/* Temporary bars */}
        {[40, 80, 20, 60, 100, 50, 30].map((value, index) => (
          <div
            key={index}
            className="bg-blue-500 w-6"
            style={{ height: `${value}%` }}
          ></div>
        ))}

      </div>

    </div>
  );
};

export default Visualizer;