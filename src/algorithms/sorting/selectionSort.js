export const selectionSort = async (
  array,
  setArray,
  setActiveIndices,
  setSortedIndices,
  speed
) => {

  let arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n; i++) {

    let minIndex = i;

    for (let j = i + 1; j < n; j++) {

      setActiveIndices([minIndex, j]);

      await new Promise(r =>
        setTimeout(r, speed)
      );

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // swap
    [arr[i], arr[minIndex]] =
      [arr[minIndex], arr[i]];

    setArray([...arr]);

    setSortedIndices(prev => [...prev, i]);

    await new Promise(r =>
      setTimeout(r, speed)
    );
  }

  setActiveIndices([]);
};