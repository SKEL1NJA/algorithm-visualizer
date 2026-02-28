const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const selectionSort = async (
  array,
  setArray,
  setActiveIndices,
  setSortedIndices,
  speed,
  controls
) => {

  let arr = [...array];
  const n = arr.length;

  // ✅ reset sorted bars
  setSortedIndices([]);

  for (let i = 0; i < n; i++) {

    let minIndex = i;

    for (let j = i + 1; j < n; j++) {

      // ✅ PAUSE SUPPORT
      while (controls?.paused) {
        await sleep(50);
      }

      setActiveIndices([minIndex, j]);

      await sleep(speed);

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // ✅ swap only if needed
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] =
        [arr[minIndex], arr[i]];

      setArray([...arr]);

      await sleep(speed);
    }

    // mark sorted
    setSortedIndices(prev => [...prev, i]);
  }

  // clear highlights
  setActiveIndices([]);
};