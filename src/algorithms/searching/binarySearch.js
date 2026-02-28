const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const binarySearch = async (
  array,
  target,
  setActiveIndices,
  setFoundIndex,
  speed,
  controls
) => {

  let left = 0;
  let right = array.length - 1;

  setFoundIndex(null);

  while (left <= right) {

    while (controls?.paused) {
      await sleep(50);
    }

    const mid =
      Math.floor((left + right) / 2);

    setActiveIndices([mid]);

    await sleep(speed);

    if (array[mid] === target) {
      setFoundIndex(mid);
      setActiveIndices([]);
      return;
    }

    if (array[mid] < target)
      left = mid + 1;
    else
      right = mid - 1;
  }

  setActiveIndices([]);
};