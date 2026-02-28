export const bubbleSort = async (
  array,
  setArray,
  setActiveIndices,
  setSortedIndices,
  speed
) => {

  let arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n; i++) {

    for (let j = 0; j < n - i - 1; j++) {

      setActiveIndices([j, j + 1]);

      await new Promise(r =>
        setTimeout(r, speed)
      );

      if (arr[j] > arr[j + 1]) {

        [arr[j], arr[j + 1]] =
          [arr[j + 1], arr[j]];

        setArray([...arr]);

        await new Promise(r =>
          setTimeout(r, speed)
        );
      }
    }

    // mark sorted element
    setSortedIndices(prev => [...prev, n - i - 1]);
  }

  setActiveIndices([]);
};