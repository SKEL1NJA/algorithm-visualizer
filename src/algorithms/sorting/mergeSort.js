const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const mergeSort = async (
  array,
  setArray,
  setActiveIndices,
  setSortedIndices,
  speed,
  controls
) => {

  let arr = [...array];

  // ✅ reset sorted state
  setSortedIndices([]);

  await mergeSortHelper(
    arr,
    0,
    arr.length - 1,
    setArray,
    setActiveIndices,
    speed,
    controls
  );

  // ✅ mark fully sorted
  setSortedIndices(
    Array.from({ length: arr.length }, (_, i) => i)
  );

  setActiveIndices([]);
};


// ================= HELPER =================

async function mergeSortHelper(
  arr,
  left,
  right,
  setArray,
  setActiveIndices,
  speed,
  controls
) {

  // ✅ pause works even during recursion
  while (controls?.paused) {
    await sleep(50);
  }

  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  await mergeSortHelper(
    arr,
    left,
    mid,
    setArray,
    setActiveIndices,
    speed,
    controls
  );

  await mergeSortHelper(
    arr,
    mid + 1,
    right,
    setArray,
    setActiveIndices,
    speed,
    controls
  );

  await merge(
    arr,
    left,
    mid,
    right,
    setArray,
    setActiveIndices,
    speed,
    controls
  );
}


// ================= MERGE =================

async function merge(
  arr,
  left,
  mid,
  right,
  setArray,
  setActiveIndices,
  speed,
  controls
) {

  let temp = [];
  let i = left;
  let j = mid + 1;

  while (i <= mid && j <= right) {

    // ✅ pause support
    while (controls?.paused) {
      await sleep(50);
    }

    setActiveIndices([i, j]);

    await sleep(speed);

    if (arr[i] <= arr[j]) {
      temp.push(arr[i++]);
    } else {
      temp.push(arr[j++]);
    }
  }

  while (i <= mid) temp.push(arr[i++]);
  while (j <= right) temp.push(arr[j++]);

  for (let k = left; k <= right; k++) {

    // ✅ pause during overwrite
    while (controls?.paused) {
      await sleep(50);
    }

    arr[k] = temp[k - left];

    setArray([...arr]);

    await sleep(speed);
  }
}