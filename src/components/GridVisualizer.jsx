import { useState } from "react";
import { bfs } from "../algorithms/pathfinding/bfs";

const ROWS = 20;
const COLS = 35;

// ================= GRID CREATION =================
const createGrid = () => {
  const grid = [];

  for (let r = 0; r < ROWS; r++) {
    const row = [];

    for (let c = 0; c < COLS; c++) {
      row.push({
        row: r,
        col: c,
        isStart: r === 10 && c === 5,
        isEnd: r === 10 && c === 25,
        isWall: false,
        isVisited: false
      });
    }

    grid.push(row);
  }

  return grid;
};

const GridVisualizer = () => {

  const [grid, setGrid] =
    useState(createGrid());

  const [speed, setSpeed] =
    useState(20);

  // ================= WALL TOGGLE =================
  const toggleWall = (row, col) => {

    const newGrid = grid.slice();
    const node = newGrid[row][col];

    if (!node.isStart && !node.isEnd) {
      node.isWall = !node.isWall;
    }

    setGrid(newGrid);
  };

  // ================= RESET VISITS =================
  const resetVisited = () => {

    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        isVisited: false
      }))
    );

    setGrid(newGrid);
  };

  // ================= RUN BFS =================
  const runBFS = async () => {

    resetVisited();

    const startNode =
      grid.flat().find(n => n.isStart);

    const endNode =
      grid.flat().find(n => n.isEnd);

    await bfs(
      grid,
      startNode,
      endNode,
      setGrid,
      speed
    );
  };

  // ================= UI =================
  return (
    <div className="flex flex-col items-center">

      <h2 className="text-white text-xl mb-4">
        Pathfinding Grid
      </h2>

      {/* CONTROLS */}
      <div className="flex gap-4 mb-4">

        <button
          onClick={runBFS}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Run BFS
        </button>

        <button
          onClick={resetVisited}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Clear Visits
        </button>

        <div className="text-white flex items-center gap-2">
          Speed
          <input
            type="range"
            min="5"
            max="100"
            value={speed}
            onChange={(e)=>
              setSpeed(Number(e.target.value))
            }
          />
        </div>

      </div>

      {/* GRID */}
      <div>
        {grid.map((row, rIdx) => (
          <div key={rIdx} className="flex">
            {row.map((node, cIdx) => {

              let color = "bg-gray-800";

              if (node.isStart)
                color = "bg-green-500";
              else if (node.isEnd)
                color = "bg-red-500";
              else if (node.isWall)
                color = "bg-black";
              else if (node.isVisited)
                color = "bg-blue-400";

              return (
                <div
                  key={cIdx}
                  onClick={() =>
                    toggleWall(
                      node.row,
                      node.col
                    )
                  }
                  className={`w-6 h-6 border border-gray-700 ${color}`}
                />
              );
            })}
          </div>
        ))}
      </div>

    </div>
  );
};

export default GridVisualizer;