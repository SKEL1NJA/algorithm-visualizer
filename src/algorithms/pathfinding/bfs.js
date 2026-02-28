const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const bfs = async (
  grid,
  startNode,
  endNode,
  setGrid,
  speed
) => {

  const queue = [];
  const visited = new Set();

  queue.push(startNode);
  visited.add(
    `${startNode.row}-${startNode.col}`
  );

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  while (queue.length > 0) {

    const current = queue.shift();

    if (
      current.row === endNode.row &&
      current.col === endNode.col
    ) {
      return;
    }

    for (const [dr, dc] of directions) {

      const newRow =
        current.row + dr;
      const newCol =
        current.col + dc;

      if (
        newRow < 0 ||
        newCol < 0 ||
        newRow >= grid.length ||
        newCol >= grid[0].length
      ) continue;

      const neighbor =
        grid[newRow][newCol];

      const key =
        `${newRow}-${newCol}`;

      if (
        visited.has(key) ||
        neighbor.isWall
      ) continue;

      visited.add(key);

      neighbor.isVisited = true;

      queue.push(neighbor);

      setGrid([...grid]);

      await sleep(speed);
    }
  }
};