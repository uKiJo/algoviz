import { bubbleSortByStep } from "./bubbleSortSteps";

describe("BubbleSortSteps", () => {
  it("should terminate sorting if no swaps are made at the end of the pass", () => {
    const state = {
      currentStep: 4,
      pass: 0,
      isSwapped: false,
      sortedData: [
        { name: "1", units: 1 },
        { name: "2", units: 2 },
        { name: "3", units: 3 },
        { name: "4", units: 4 },
        { name: "5", units: 5 },
      ],
      isIterating: false,
      sortedItems: 0,
    };

    const result = bubbleSortByStep(state);

    expect(result.sortedItems).toBe(5);
  });

  it("should increment pass if atleast one swap is made at the end of the pass", () => {
    const state = {
      currentStep: 4,
      pass: 0,
      isSwapped: true,
      sortedData: [
        { name: "1", units: 1 },
        { name: "2", units: 2 },
        { name: "3", units: 3 },
        { name: "4", units: 4 },
        { name: "5", units: 5 },
      ],
      isIterating: false,
      sortedItems: 0,
    };

    const result = bubbleSortByStep(state);

    expect(result.pass).toBe(1);
  });

  it("should swap objects if the current object value is greater than the next object value", () => {
    const state = {
      currentStep: 0,
      pass: 0,
      isSwapped: false,
      sortedData: [
        { name: "2", units: 2 },
        { name: "1", units: 1 },
      ],
      isIterating: false,
      sortedItems: 0,
    };

    const result = bubbleSortByStep(state);
    expect(result.sortedData).toEqual([
      { name: "1", units: 1 },
      { name: "2", units: 2 },
    ]);
  });

  it("should increment step if the current object value is not greater than the next object value", () => {
    const state = {
      currentStep: 0,
      pass: 0,
      isSwapped: false,
      sortedData: [
        { name: "1", units: 1 },
        { name: "2", units: 2 },
      ],
      isIterating: false,
      sortedItems: 0,
    };

    const result = bubbleSortByStep(state);
    expect(result.currentStep).toBe(1);
  });

  it("should increment step and make the last item sorted if the current object value is not greater than the next object value and the step is the last in the pass", () => {
    const state = {
      currentStep: 0,
      pass: 0,
      isSwapped: false,
      sortedData: [
        { name: "1", units: 1 },
        { name: "2", units: 2 },
      ],
      isIterating: false,
      sortedItems: 0,
    };

    const result = bubbleSortByStep(state);
    expect(result.currentStep).toBe(1);
    expect(result.sortedItems).toBe(1);
  });

  it("should increment step at the beginning of sorting", () => {
    const state = {
      currentStep: -1,
      pass: 0,
      isSwapped: false,
      sortedData: [
        { name: "1", units: 1 },
        { name: "2", units: 2 },
      ],
      isIterating: false,
      sortedItems: 0,
    };

    const result = bubbleSortByStep(state);

    expect(result.currentStep).toBe(0);
  });
});
