import { getNextStepStates } from "./bubbleSortSteps";

describe("BubbleSortSteps", () => {
  it("should set the next step states when the pass is finished and no swaps were made", () => {
    const input = {
      currentStep: 1,
      pass: 0,
      isSwapped: false,
      sortedData: [
        {
          name: "foo",
          units: 2,
        },
        {
          name: "bar",
          units: 3,
        },
        {
          name: "baz",
          units: 1,
        },
        {
          name: "hoge",
          units: 6,
        },
        {
          name: "piyo",
          units: 3,
        },
        {
          name: "hogera",
          units: 4,
        },
      ],
      sortedItems: -1,
      start: false,
      end: false,
      isSelectStep: true,
    };

    const expected = {
      ...input,
      sortedData: [
        {
          name: "foo",
          units: 2,
        },
        {
          name: "baz",
          units: 1,
        },
        {
          name: "bar",
          units: 3,
        },
        {
          name: "hoge",
          units: 6,
        },
        {
          name: "piyo",
          units: 3,
        },
        {
          name: "hogera",
          units: 4,
        },
      ],
      isSelectStep: false,
      isSwapped: true,
    };

    const result = getNextStepStates(input);

    expect(result).toEqual(expected);
  });
});
