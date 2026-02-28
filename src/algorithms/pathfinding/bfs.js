const sleep = (ms) =>
  new Promise(r => setTimeout(r, ms));

export const bfs = async (
  grid,
  startNode,
  endNode,
  setGrid,
  speed
) => {

  const queue = [startNode];
  const visited = new Set();

  visited.add(
    `${startNode.row}-${startNode.col}`
  );

  const dirs = [
    [1,0],[-1,0],[0,1],[0,-1]
  ];

  while (queue.length) {

    const current = queue.shift();

    if (
      current.row === endNode.row &&
      current.col === endNode.col
    ) {
      await animatePath(
        endNode,
        grid,
        setGrid,
        speed
      );
      return;
    }

    for (const [dr,dc] of dirs) {

      const r = current.row + dr;
      const c = current.col + dc;

      if (
        r < 0 || c < 0 ||
        r >= grid.length ||
        c >= grid[0].length
      ) continue;

      const neighbor = grid[r][c];
      const key = `${r}-${c}`;

      if (
        visited.has(key) ||
        neighbor.isWall
      ) continue;

      visited.add(key);

      neighbor.previousNode = current;
      neighbor.isVisited = true;

      queue.push(neighbor);

      setGrid([...grid]);
      await sleep(speed);
    }
  }
};

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