export const algorithmInfo = {

  bubble: {
    name: "Bubble Sort",
    time: "O(n²)",
    space: "O(1)",
    description:
      "Repeatedly compares adjacent elements and swaps them."
  },

  selection: {
    name: "Selection Sort",
    time: "O(n²)",
    space: "O(1)",
    description:
      "Selects minimum element and places it in correct position."
  },

  merge: {
    name: "Merge Sort",
    time: "O(n log n)",
    space: "O(n)",
    description:
      "Divide and conquer algorithm that recursively merges sorted halves."
  },

  quick: {
    name: "Quick Sort",
    time: "O(n log n) average",
    space: "O(log n)",
    description:
      "Uses a pivot element to partition the array into smaller subarrays."
  },

  heap: {
    name: "Heap Sort",
    time: "O(n log n)",
    space: "O(1)",
    description:
      "Builds a max heap and repeatedly extracts the maximum element."
  },

  linear: {
    name: "Linear Search",
    time: "O(n)",
    space: "O(1)",
    description:
      "Sequentially checks each element until the target is found."
  },

  binary: {
    name: "Binary Search",
    time: "O(log n)",
    space: "O(1)",
    description:
      "Efficiently searches a sorted array by halving the search space."
  }

};