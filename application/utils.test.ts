import { generateRandomArray, swap } from "./utils";

describe("generateRandomArray function", () => {
  test("the generated array length should be 10", () => {
    const array = generateRandomArray();
    expect(array).toHaveLength(10);
  });

  test("should return an array with unique values", () => {
    const array = generateRandomArray();
    const set = new Set(array);
    expect(set.size).toEqual(10);
  });

  test("should return an array with elements between 0 and 50", () => {
    const array = generateRandomArray();
    for (const element of array) {
      expect(element).toBeGreaterThan(0);
      expect(element).toBeLessThanOrEqual(50);
    }
  });
});

describe("swap function", () => {
  test("swap an array of two elements", () => {
    const array = [1, 2];
    swap(array, 0, 1);
    expect(array).toEqual([2, 1]);
  });
});
