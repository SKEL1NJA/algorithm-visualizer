const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const mergeSort = async (
  array,
  setArray,
  setActiveIndices,
  setSortedIndices,
  speed
) => {

  let arr = [...array];

  await mergeSortHelper(
    arr,
    0,
    arr.length - 1,
    setArray,
    setActiveIndices,
    speed
  );

  // mark all sorted
  setSortedIndices(
    Array.from({ length: arr.length }, (_, i) => i)
  );

  setActiveIndices([]);
};

async function mergeSortHelper(
  arr,
  left,
  right,
  setArray,
  setActiveIndices,
  speed
) {

  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  await mergeSortHelper(
    arr,
    left,
    mid,
    setArray,
    setActiveIndices,
    speed
  );

  await mergeSortHelper(
    arr,
    mid + 1,
    right,
    setArray,
    setActiveIndices,
    speed
  );

  await merge(
    arr,
    left,
    mid,
    right,
    setArray,
    setActiveIndices,
    speed
  );
}

async function merge(
  arr,
  left,
  mid,
  right,
  setArray,
  setActiveIndices,
  speed
) {

  let temp = [];
  let i = left;
  let j = mid + 1;

  while (i <= mid && j <= right) {

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
    arr[k] = temp[k - left];

    setArray([...arr]);
    await sleep(speed);
  }
}