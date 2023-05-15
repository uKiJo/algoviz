import { getNextStepStates } from "./bubbleSortSteps";

describe("BubbleSortSteps", () => {
  it("should select the first two elements at the beginning of sorting ", () => {
    const input = {
      currentStep: -1,
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
      isSelectStep: false,
    };

    const expected = {
      ...input,
      start: true,
      currentStep: 0,
      isSelectStep: true,
    };

    const result = getNextStepStates(input);

    expect(result).toEqual(expected);
  });

  it("should increment step if no swap is done", () => {
    const input = {
      currentStep: 0,
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
      isSelectStep: false,
    };

    const expected = {
      ...input,
      start: true,
      currentStep: 1,
      isSelectStep: true,
    };

    const result = getNextStepStates(input);

    expect(result).toEqual(expected);
  });

  it("should swap if the first element is greater than its next adjacent", () => {
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
      start: true,
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
      currentStep: 1,
      isSelectStep: false,
      isSwapped: true,
    };

    const result = getNextStepStates(input);

    expect(result).toEqual(expected);
  });

  it("should increment step after swap is done", () => {
    const input = {
      currentStep: 1,
      pass: 0,
      isSwapped: true,
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
      start: true,
      end: false,
      isSelectStep: false,
    };

    const expected = {
      ...input,
      currentStep: 2,
      isSelectStep: true,
    };

    const result = getNextStepStates(input);

    expect(result).toEqual(expected);
  });
});
