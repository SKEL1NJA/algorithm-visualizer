const sleep = (ms) =>
  new Promise(r => setTimeout(r, ms));

export const dijkstra = async (
  grid,
  startNode,
  endNode,
  setGrid,
  speed
) => {

  startNode.distance = 0;

  const unvisited =
    grid.flat();

  while (unvisited.length) {

    unvisited.sort(
      (a,b) => a.distance - b.distance
    );

    const closest =
      unvisited.shift();

    if (closest.isWall)
      continue;

    if (
      closest.distance === Infinity
    )
      return;

    closest.isVisited = true;

    setGrid([...grid]);
    await sleep(speed);

    if (
      closest.row === endNode.row &&
      closest.col === endNode.col
    ) {
      await animatePath(
        endNode,
        grid,
        setGrid,
        speed
      );
      return;
    }

    updateNeighbors(
      closest,
      grid
    );
  }
};


// ================= UPDATE =================

function updateNeighbors(
  node,
  grid
) {

  const dirs = [
    [1,0],
    [-1,0],
    [0,1],
    [0,-1]
  ];

  for (const [dr,dc] of dirs) {

    const r = node.row + dr;
    const c = node.col + dc;

    if (
      r < 0 ||
      c < 0 ||
      r >= grid.length ||
      c >= grid[0].length
    ) continue;

    const neighbor =
      grid[r][c];

    if (neighbor.isVisited)
      continue;

    const newDist =
      node.distance +
      neighbor.weight;

    if (newDist <
        neighbor.distance) {

      neighbor.distance =
        newDist;

      neighbor.previousNode =
        node;
    }
  }
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
    current =
      current.previousNode;
  }

  path.reverse();

  for (const node of path) {
    node.isPath = true;
    setGrid([...grid]);
    await sleep(speed * 2);
  }
}