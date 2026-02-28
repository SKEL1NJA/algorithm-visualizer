export const bubbleSort = async (array, setArray) => {
  let arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {

      // swap if needed
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        setArray([...arr]);

        // animation delay
        await new Promise(resolve =>
          setTimeout(resolve, 50)
        );
      }
    }
  }
};