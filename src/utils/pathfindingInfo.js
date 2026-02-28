export const pathfindingInfo = {

  bfs: {
    name: "Breadth First Search (BFS)",
    description:
      "Explores neighbors level by level. Guarantees the shortest path in an unweighted grid.",
    time: "O(V + E)",
    space: "O(V)",
    shortest: "✅ Yes (Unweighted)"
  },

  dfs: {
    name: "Depth First Search (DFS)",
    description:
      "Explores as deep as possible before backtracking. Does NOT guarantee shortest path.",
    time: "O(V + E)",
    space: "O(V)",
    shortest: "❌ No"
  },

  dijkstra: {
    name: "Dijkstra Algorithm",
    description:
      "Finds shortest path using distance relaxation. Works for weighted graphs.",
    time: "O(V²)",
    space: "O(V)",
    shortest: "✅ Yes (Weighted)"
  }

};