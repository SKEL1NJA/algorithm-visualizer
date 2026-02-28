import { useState } from "react";
import { bfs } from "../algorithms/pathfinding/bfs";
import { dfs } from "../algorithms/pathfinding/dfs";
import { dijkstra } from "../algorithms/pathfinding/dijkstra";

import PathfindingInfo
from "./PathfindingInfo";

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
        isVisited: false,
        isPath: false,
        previousNode: null,
        distance: Infinity,
        weight: 1
      });
    }

    grid.push(row);
  }

  return grid;
};

export default function GridVisualizer() {

  const [grid,setGrid] =
    useState(createGrid());

  const [speed,setSpeed] =
    useState(20);

  const [algorithm,setAlgorithm] =
    useState("bfs");

  const algorithms={
    bfs,
    dfs,
    dijkstra
  };

  const clearSearch=()=>{

    const newGrid=
      grid.map(row =>
        row.map(node => ({
          ...node,
          isVisited:false,
          isPath:false,
          previousNode:null,
          distance:Infinity
        }))
      );

    setGrid(newGrid);
    return newGrid;
  };

  const runAlgorithm=async()=>{

    const fresh=
      clearSearch();

    const start=
      fresh.flat()
      .find(n=>n.isStart);

    const end=
      fresh.flat()
      .find(n=>n.isEnd);

    await algorithms[algorithm](
      fresh,
      start,
      end,
      setGrid,
      speed
    );
  };

  const toggleWall=(r,c)=>{

    const newGrid=
      grid.map(row =>
        row.map(n=>({...n}))
      );

    const node=newGrid[r][c];

    if(!node.isStart &&
       !node.isEnd)
      node.isWall=!node.isWall;

    setGrid(newGrid);
  };

  return(
    <div className="flex flex-col items-center">

      {/* ✅ INFO PANEL */}
      <PathfindingInfo
        algorithm={algorithm}
      />

      <div className="flex gap-4 mb-4">

        <select
          value={algorithm}
          onChange={(e)=>
            setAlgorithm(
              e.target.value
            )
          }
          className="bg-gray-800 text-white px-3 py-2 rounded"
        >
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
          <option value="dijkstra">
            Dijkstra
          </option>
        </select>

        <button
          onClick={runAlgorithm}
          className="bg-blue-600 px-4 py-2 text-white rounded">
          Run
        </button>

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

      <div>
        {grid.map((row,r)=>(
          <div key={r} className="flex">
            {row.map((node,c)=>{

              let color="bg-gray-800";

              if(node.isStart)
                color="bg-green-500";
              else if(node.isEnd)
                color="bg-red-500";
              else if(node.isWall)
                color="bg-black";
              else if(node.isPath)
                color="bg-yellow-400";
              else if(node.isVisited)
                color="bg-blue-400";

              return(
                <div
                  key={c}
                  onClick={()=>toggleWall(node.row,node.col)}
                  className={`w-6 h-6 border border-gray-700 ${color}`}
                />
              );
            })}
          </div>
        ))}
      </div>

    </div>
  );
}