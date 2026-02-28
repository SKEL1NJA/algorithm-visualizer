const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const linearSearch = async (
  array,
  target,
  setActiveIndices,
  setFoundIndex,
  speed,
  controls
) => {

  setFoundIndex(null);

  for (let i = 0; i < array.length; i++) {

    while (controls?.paused) {
      await sleep(50);
    }

    setActiveIndices([i]);

    await sleep(speed);

    if (array[i] === target) {
      setFoundIndex(i);
      setActiveIndices([]);
      return;
    }
  }

  setActiveIndices([]);
};