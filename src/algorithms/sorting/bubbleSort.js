const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const bubbleSort = async (
  array,
  setArray,
  setActiveIndices,
  setSortedIndices,
  speed,
  controls
) => {

  let arr = [...array];
  const n = arr.length;

  // ✅ reset sorted bars when starting
  setSortedIndices([]);

  for (let i = 0; i < n; i++) {

    for (let j = 0; j < n - i - 1; j++) {

      // ✅ PAUSE SUPPORT
      while (controls?.paused) {
        await sleep(50);
      }

      // highlight comparison
      setActiveIndices([j, j + 1]);

      await sleep(speed);

      if (arr[j] > arr[j + 1]) {

        // swap
        [arr[j], arr[j + 1]] =
          [arr[j + 1], arr[j]];

        setArray([...arr]);

        await sleep(speed);
      }
    }

    // mark sorted element
    setSortedIndices(prev => [
      ...prev,
      n - i - 1
    ]);
  }

  // clear highlights
  setActiveIndices([]);
};