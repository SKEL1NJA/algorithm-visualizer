import { useState } from "react";

import Navbar from "./components/Navbar";
import Visualizer from "./components/Visualizer";
import GridVisualizer from "./components/GridVisualizer";

function App() {

  const [mode, setMode] =
    useState("sorting");

  return (
    <div className="bg-black min-h-screen">

      <Navbar />

      {/* MODE SWITCH */}
      <div className="flex justify-center gap-4 p-4">

        <button
          onClick={() =>
            setMode("sorting")
          }
          className={`px-4 py-2 rounded ${
            mode === "sorting"
              ? "bg-blue-600"
              : "bg-gray-700"
          }`}
        >
          Sorting / Searching
        </button>

        <button
          onClick={() =>
            setMode("pathfinding")
          }
          className={`px-4 py-2 rounded ${
            mode === "pathfinding"
              ? "bg-blue-600"
              : "bg-gray-700"
          }`}
        >
          Pathfinding
        </button>

      </div>

      {/* VIEW RENDER */}
      {mode === "sorting"
        ? <Visualizer />
        : <GridVisualizer />}
    </div>
  );
}

export default App;