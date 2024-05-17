export function getRandomElements<T = unknown>(arr: T[], amount: number) {
  if (amount > arr.length) {
    throw new Error(
      "Amount cannot be greater than the number of elements in the array"
    );
  }

  const result = [];
  const taken = new Array(arr.length);

  while (result.length < amount) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    if (!taken[randomIndex]) {
      result.push(arr[randomIndex]);
      taken[randomIndex] = true;
    }
  }

  return result;
}
