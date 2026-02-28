import { useState } from "react";

const ROWS = 20;
const COLS = 35;

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

  // Toggle walls
  const toggleWall = (row, col) => {

    const newGrid = grid.slice();
    const node = newGrid[row][col];

    if (!node.isStart && !node.isEnd) {
      node.isWall = !node.isWall;
    }

    setGrid(newGrid);
  };

  return (
    <div className="flex flex-col items-center">

      <h2 className="text-white text-xl mb-4">
        Pathfinding Grid
      </h2>

      <div>
        {grid.map((row, rIdx) => (
          <div key={rIdx} className="flex">
            {row.map((node, cIdx) => {

              let color =
                "bg-gray-800";

              if (node.isStart)
                color = "bg-green-500";
              else if (node.isEnd)
                color = "bg-red-500";
              else if (node.isWall)
                color = "bg-black";

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