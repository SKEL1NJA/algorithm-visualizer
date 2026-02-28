const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const dfs = async (
  grid,
  startNode,
  endNode,
  setGrid,
  speed
) => {

  const visited = new Set();

  const found = await dfsHelper(
    startNode,
    endNode,
    grid,
    visited,
    setGrid,
    speed
  );

  if (found) {
    await animatePath(
      endNode,
      grid,
      setGrid,
      speed
    );
  }
};


// ================= DFS RECURSION =================

async function dfsHelper(
  node,
  endNode,
  grid,
  visited,
  setGrid,
  speed
) {

  const key =
    `${node.row}-${node.col}`;

  if (
    visited.has(key) ||
    node.isWall
  ) return false;

  visited.add(key);

  node.isVisited = true;

  setGrid([...grid]);
  await sleep(speed);

  if (
    node.row === endNode.row &&
    node.col === endNode.col
  ) {
    return true;
  }

  const directions = [
    [1,0],
    [-1,0],
    [0,1],
    [0,-1]
  ];

  for (const [dr, dc] of directions) {

    const r = node.row + dr;
    const c = node.col + dc;

    if (
      r < 0 ||
      c < 0 ||
      r >= grid.length ||
      c >= grid[0].length
    ) continue;

    const neighbor = grid[r][c];

    neighbor.previousNode = node;

    const found =
      await dfsHelper(
        neighbor,
        endNode,
        grid,
        visited,
        setGrid,
        speed
      );

    if (found) return true;
  }

  return false;
}


// ================= PATH =================

async function animatePath(
  endNode,
  grid,
  setGrid,
  speed
) {

  let current = endNode;
  const path = [];

  while (current) {
    path.push(current);
    current = current.previousNode;
  }

  path.reverse();

  for (const node of path) {
    node.isPath = true;
    setGrid([...grid]);
    await sleep(speed * 2);
  }
}