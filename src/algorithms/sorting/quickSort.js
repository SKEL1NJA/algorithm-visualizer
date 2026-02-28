const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const quickSort = async (
  array,
  setArray,
  setActiveIndices,
  setSortedIndices,
  speed,
  controls
) => {

  let arr = [...array];

  // reset sorted
  setSortedIndices([]);

  await quickSortHelper(
    arr,
    0,
    arr.length - 1,
    setArray,
    setActiveIndices,
    speed,
    controls
  );

  // mark fully sorted ONLY ONCE
  setSortedIndices(
    Array.from({ length: arr.length }, (_, i) => i)
  );

  setActiveIndices([]);
};


// ================= HELPER =================

async function quickSortHelper(
  arr,
  low,
  high,
  setArray,
  setActiveIndices,
  speed,
  controls
) {

  if (low >= high) return;

  const pivotIndex = await partition(
    arr,
    low,
    high,
    setArray,
    setActiveIndices,
    speed,
    controls
  );

  await quickSortHelper(
    arr,
    low,
    pivotIndex - 1,
    setArray,
    setActiveIndices,
    speed,
    controls
  );

  await quickSortHelper(
    arr,
    pivotIndex + 1,
    high,
    setArray,
    setActiveIndices,
    speed,
    controls
  );
}


// ================= PARTITION =================

async function partition(
  arr,
  low,
  high,
  setArray,
  setActiveIndices,
  speed,
  controls
) {

  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {

    while (controls?.paused) {
      await sleep(50);
    }

    setActiveIndices([j, high]);

    await sleep(speed);

    if (arr[j] < pivot) {
      i++;

      [arr[i], arr[j]] =
        [arr[j], arr[i]];

      setArray([...arr]);

      await sleep(speed);
    }
  }

  [arr[i + 1], arr[high]] =
    [arr[high], arr[i + 1]];

  setArray([...arr]);

  await sleep(speed);

  return i + 1;
}