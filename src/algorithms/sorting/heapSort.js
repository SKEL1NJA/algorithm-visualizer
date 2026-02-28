const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const heapSort = async (
  array,
  setArray,
  setActiveIndices,
  setSortedIndices,
  speed,
  controls
) => {

  let arr = [...array];
  const n = arr.length;

  setSortedIndices([]);

  // ---------- BUILD MAX HEAP ----------
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(
      arr,
      n,
      i,
      setArray,
      setActiveIndices,
      speed,
      controls
    );
  }

  // ---------- SORT ----------
  for (let i = n - 1; i > 0; i--) {

    while (controls?.paused) {
      await sleep(50);
    }

    // swap root with last
    [arr[0], arr[i]] = [arr[i], arr[0]];

    setArray([...arr]);
    setSortedIndices(prev => [...prev, i]);

    await sleep(speed);

    await heapify(
      arr,
      i,
      0,
      setArray,
      setActiveIndices,
      speed,
      controls
    );
  }

  setSortedIndices(
    Array.from({ length: n }, (_, i) => i)
  );

  setActiveIndices([]);
};


// ================= HEAPIFY =================

async function heapify(
  arr,
  heapSize,
  root,
  setArray,
  setActiveIndices,
  speed,
  controls
) {

  let largest = root;
  const left = 2 * root + 1;
  const right = 2 * root + 2;

  while (controls?.paused) {
    await sleep(50);
  }

  if (left < heapSize) {
    setActiveIndices([largest, left]);
    await sleep(speed);

    if (arr[left] > arr[largest])
      largest = left;
  }

  if (right < heapSize) {
    setActiveIndices([largest, right]);
    await sleep(speed);

    if (arr[right] > arr[largest])
      largest = right;
  }

  if (largest !== root) {

    [arr[root], arr[largest]] =
      [arr[largest], arr[root]];

    setArray([...arr]);

    await sleep(speed);

    await heapify(
      arr,
      heapSize,
      largest,
      setArray,
      setActiveIndices,
      speed,
      controls
    );
  }
}