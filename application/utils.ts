export function generateRandomArray(): number[] {
  const length = 10;
  const max = 50;
  const min = 1;
  const randomArray: number[] = [];

  while (randomArray.length < length) {
    const randomNumber: number =
      Math.floor(Math.random() * (max - min + 1)) + min;
    if (!randomArray.includes(randomNumber)) {
      randomArray.push(randomNumber);
    }
  }

  return randomArray;
}

export function swap(arr: number[], xp: number, yp: number) {
  var temp = arr[xp];
  arr[xp] = arr[yp];
  arr[yp] = temp;
}
