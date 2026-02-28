import { useState } from "react";
import { bfs } from "../algorithms/pathfinding/bfs";
import { dfs } from "../algorithms/pathfinding/dfs";
import { dijkstra } from "../algorithms/pathfinding/dijkstra";

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

  const clearSearch = () => {

    const newGrid =
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

  const runAlgo = async (algo) => {

    const fresh =
      clearSearch();

    const start =
      fresh.flat()
      .find(n=>n.isStart);

    const end =
      fresh.flat()
      .find(n=>n.isEnd);

    await algo(
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

      <h2 className="text-white text-xl mb-4">
        Pathfinding Visualizer
      </h2>

      <div className="flex gap-4 mb-4">

        <button
          onClick={()=>runAlgo(bfs)}
          className="bg-blue-600 px-4 py-2 text-white rounded">
          BFS
        </button>

        <button
          onClick={()=>runAlgo(dfs)}
          className="bg-purple-600 px-4 py-2 text-white rounded">
          DFS
        </button>

        <button
          onClick={()=>runAlgo(dijkstra)}
          className="bg-green-600 px-4 py-2 text-white rounded">
          Dijkstra
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
                  onClick={()=>
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
}